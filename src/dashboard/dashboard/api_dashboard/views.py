from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from api_dashboard.models import GameHistory
from api_user.models import CustomUser
from .serializers import GameHistorySerializer
from django.views.decorators.csrf import csrf_protect
from django.db.models import Q

# Returns the game history of the connected user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getGameHistory(request):
	if request.user.is_authenticated:
		# game_history = GameHistory.objects.filter(user=request.user)
		game_history = GameHistory.objects.filter(myUsername=request.user.username)
		serializer = GameHistorySerializer(game_history, many=True)

		return Response(serializer.data)
	else:
		return Response({'error': 'User not authenticated'}, status=401)


# Adds a new game history instance
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addStats(request):
	try:
		user = request.user
		# if not user.is_authenticated:
		# 	return Response({'error': 'User not authenticated'}, status=401)

		myUsername = user.username
		opponentUsername = request.data.get('opponentUsername')
		opponentScore = request.data.get('opponentScore')
		myScore = request.data.get('myScore')
		date = request.data.get('date')

		if not opponentUsername or opponentScore is None or myScore is None or not date:
			return Response({'error': 'Missing required fields'}, status=400)
		
		if user.is_authenticated:
			# Add game history instance
			GameHistory.objects.create(
				myUsername=myUsername,
				opponentUsername=opponentUsername,
				opponentScore=opponentScore,
				myScore=myScore,
				date=date
			)
			print("gamehistory instance created for user: ", myUsername, "\n opponent: ", 
			opponentUsername, "\n opponent score: ", opponentScore, "\n my score: ", 
			myScore, "\n date: ", date) #DEBUG

		# Check if the opponent is authenticated and add their game history if they have an account
		opponent = CustomUser.objects.filter(username=opponentUsername).first()
		if opponent and opponent.is_authenticated:
			GameHistory.objects.create(
				myUsername=opponentUsername,
				opponentUsername=myUsername,
				opponentScore=myScore,
				myScore=opponentScore,
				date=date
			)

		return Response({"message": "Game history instance added successfully"})
	except Exception as e:
		return Response({'error': str(e)}, status=500)


@api_view(['PUT'])
@csrf_protect
def anonymiseGameHistory(request):
	try:
		oldUsername = request.data.get('old_username')
		newUsername = request.data.get('new_username')
		
		games = GameHistory.objects.filter(Q(myUsername=oldUsername) | Q(opponentUsername=oldUsername))
		if not games.exists():
			return Response({"error": "No matching games found"}, status=404)

		for game in games:
			if game.myUsername == oldUsername:
				game.myUsername = newUsername
			if game.opponentUsername == oldUsername:
				game.opponentUsername = newUsername
			game.save()

		print("Game history instances anonymised successfully") #DEBUG

		return Response({"anonymiseGameHistory view message": "Game history instance anonymised successfully"})

	except Exception as e:
		return Response({'error': str(e)}, status=500)
	

@api_view(['DELETE'])
@csrf_protect
def deleteGameHistory(request):
	try:
		print("deleteGameHistory view called") #DEBUG
		username = request.data.get('username')
		print("account to delete: ", username) #DEBUG
		
		games = GameHistory.objects.filter(Q(myUsername=username))
		if not games.exists():
			return Response({"error": "No matching games found"}, status=404)

		for game in games:
			if game.myUsername == username:
				game.delete()

		games = GameHistory.objects.filter(Q(opponentUsername=username))
		for game in games:
			if game.opponentUsername == username:
				game.opponentUsername = "deleted_user"
			game.save()

		print("Game history instances deleted successfully")

		user = CustomUser.objects.get(username=username)
		user.delete()

		print("User account deleted successfully")

		return Response({"deleteGameHistory view message": "Account deleted successfully"})

	except Exception as e:
		return Response({'error': str(e)}, status=500)