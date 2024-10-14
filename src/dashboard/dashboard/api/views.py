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
	if request.user.is_authenticated:
		game_history = GameHistory.objects.filter(user=request.user)
		serializer = GameHistorySerializer(game_history, many=True)
		return Response(serializer.data)
	else:
		return Response({'error': 'User not authenticated'}, status=401)


# Adds a new game history instance
@api_view(['POST'])
def addStats(request):
	try:
		user = request.user
		if not user.is_authenticated:
			return Response({'error': 'User not authenticated'}, status=401)

		opponentUsername = request.data.get('opponentUsername')
		opponentScore = request.data.get('opponentScore')
		myScore = request.data.get('myScore')
		date = request.data.get('date')

		if not opponentUsername or opponentScore is None or myScore is None or not date:
			return Response({'error': 'Missing required fields'}, status=400)

		# Add game history instance
		GameHistory.objects.create(
			user=user,
			opponentUsername=opponentUsername,
			opponentScore=opponentScore,
			myScore=myScore
			date=date
		)

		return Response({"message": "Game history instance added successfully"})
	except Exception as e:
		return Response({'error': str(e)}, status=500)
	
	
# # Returns the connected user's username
# @api_view(['GET'])
# @login_required
# def getData(request):
# 	try:
# 		user = request.user
# 		if not user.is_authenticated:
# 			return Response({'error': 'User not authenticated'}, status=401)
# 		items = Stats.objects.all()
# 		serializer = statsSerializer(items, many=True)
# 		return Response(serializer.data)
# 	except Exception as e:
# 		return Response({'error': str(e)}, status=500)