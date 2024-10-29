from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from base.models import GameHistory
from api_user.models import CustomUser
from .serializers import GameHistorySerializer
# from .serializers import statsSerializer


# Returns the game history of the connected user
@api_view(['GET'])
@login_required
def getGameHistory(request):
	print("INSIDE GET GAME HISTORY") #DEBUG
	if request.user.is_authenticated:
		# game_history = GameHistory.objects.filter(user=request.user)
		game_history = GameHistory.objects.filter(myUsername=request.user.username)
		serializer = GameHistorySerializer(game_history, many=True)

		if GameHistory.objects.filter(opponentUsername="🤖 Ponginator3000 🤖").exists(): #DEBUG
			print("SUCCESS: PONGINATOR FOUND IN GET GAME HISTORY") #DEBUG
			ponginator_games = [game for game in serializer.data if game['opponentUsername'] == '🤖 Ponginator3000 🤖']
			print(f"Retrieved game history for Ponginator3000 game entry only: {ponginator_games}")
		else:
			print("ERROR: PONGINATOR NOT FOUND IN GET GAME HISTORY") #DEBUG

		# print(f"Retrieved game history: {serializer.data}") #DEBUG
		return Response(serializer.data, status=200)
	else:
		return Response({'error': 'User not authenticated'}, status=401)


# Adds a new game history instance
@api_view(['POST'])
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
			print("gamehistory instance created for user: ", opponentUsername, "\n opponent: ", 
			myUsername, "\n opponent score: ", myScore, "\n my score: ", 
			opponentScore, "\n date: ", date) #DEBUG


		return Response({"message": "Game history instance added successfully"})
	except Exception as e:
		return Response({'error': str(e)}, status=500)


