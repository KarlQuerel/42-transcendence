# from rest_framework.response import Response
# from django.contrib.auth.decorators import login_required
# #converts any response to json


# from rest_framework.decorators import api_view
# from base.models import Stats, GameHistory
# from .serializers import statsSerializer, GameHistorySerializer
# from api_user.models import CustomUser



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



# @api_view(['POST'])
# def addStats(request):
# 	try:
# 		print("addStats called") //TEST
# 		#call getUsers view to add new users signed in
# 		getUsers(request) #HERE: TEST

# 		user = request.user
# 		if not user.is_authenticated:
# 			return Response({'error': 'User not authenticated'}, status=401)

# 		leftNick = request.data.get('leftNick')
# 		rightNick = request.data.get('rightNick')
# 		leftScore = request.data.get('leftScore')
# 		rightScore = request.data.get('rightScore')

# 		# Check if Stats instance exists for leftNick
# 		leftStats = Stats.objects.filter(username=leftNick).first()
# 		if leftStats:
# 			# Update game history for leftNick
# 			GameHistory.objects.create(
# 				stats=leftStats,
# 				opponentUsername=rightNick,
# 				opponentScore=rightScore,
# 				myScore=leftScore
# 			)
# 			# leftStats.nb_of_games_played += 1
# 			if leftScore > rightScore:
# 				leftStats.nb_of_victories += 1
# 			else:
# 				leftStats.nb_of_defeats += 1
# 			leftStats.save()
# 			print("leftStats saved") //TEST

# 		# Check if Stats instance exists for rightNick
# 		rightStats = Stats.objects.filter(username=rightNick).first()
# 		if rightStats:
# 			# Update game history for rightNick
# 			GameHistory.objects.create(
# 				stats=rightStats,
# 				opponentUsername=leftNick,
# 				opponentScore=leftScore,
# 				myScore=rightScore
# 			)
# 			# rightStats.nb_of_games_played += 1
# 			if rightScore > leftScore:
# 				rightStats.nb_of_victories += 1
# 			else:
# 				rightStats.nb_of_defeats += 1
# 			rightStats.save()
# 			print("rightStats saved") //TEST
		
# 		# Response can be adjusted based on what you need to return
# 		return Response({"message": "Stats updated successfully for existing nicknames"})
# 	except Exception as e:
# 		return Response({'error': str(e)}, status=500)



# #TEST JESS
# @api_view(['GET'])
# def getGameHistory(request):
# 	if request.user.is_authenticated:
# 		serializer = GameHistorySerializer(request.user)
# 		return Response(serializer.data)
# 	else:
# 		return Response({'error': 'User not authenticated'}, status=401)
	

# #fonction pour ajouter new users signed in au delà de ceux de base ajoutés avec populate_db
# @api_view(['GET'])
# def getUsers(request):
#     # Get all users from User database
#     all_users = CustomUser.objects.all()
#     new_users = []

#     for user in all_users:
#         # Check if user already exists in Stats (because it is a base user added with populate_db command), skip
#         if not Stats.objects.filter(username=user.username).exists():
#             # Add user to dashboard database
#             Stats.objects.create(
#                 username=user.username,
#                 nb_of_victories=0,  # Default value, update as needed
#                 nb_of_defeats=0     # Default value, update as needed
#             )
#             new_users.append(user.username)

#     return Response({'error trying to add new users from user_db in dashboard_db': new_users}, status=200)





# src/dashboard/dashboard/api/views.py
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from base.models import GameHistory
from api_user.models import CustomUser
from .serializers import GameHistorySerializer

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

		# Add game history instance
		GameHistory.objects.create(
			user=user,
			opponentUsername=opponentUsername,
			opponentScore=opponentScore,
			myScore=myScore
		)

		# Response can be adjusted based on what you need to return
		return Response({"message": "Game history instance added successfully"})
	except Exception as e:
		return Response({'error': str(e)}, status=500)
	
# Returns the connected user's username
@api_view(['GET'])
@login_required
def getData(request):
	try:
		user = request.user
		if not user.is_authenticated:
			return Response({'error': 'User not authenticated'}, status=401)
		items = Stats.objects.all()
		serializer = statsSerializer(items, many=True)
		return Response(serializer.data)
	except Exception as e:
		return Response({'error': str(e)}, status=500)