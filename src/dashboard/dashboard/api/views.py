from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
#converts any response to json


from rest_framework.decorators import api_view
from base.models import Stats, GameHistory
from .serializers import statsSerializer, GameHistorySerializer


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



################# ORIGINAL #################

# @api_view(['GET'])
# def getData(request):
# 	items = Stats.objects.all()
# 	serializer = statsSerializer(items, many=True)
# 	return Response(serializer.data)

############################################



# @api_view(['POST'])
# def addStats(request):
# 	serializer = statsSerializer(data=request.data)
# 	if serializer.is_valid():
# 		serializer.save()
# 	return Response(serializer.data)



""" @api_view(['POST'])
def addStats(request):
	try:
		user = request.user
		if not user.is_authenticated:
			return Response({'error': 'User not authenticated'}, status=401)

		leftNick = request.data.get('leftNick')
		rightNick = request.data.get('rightNick')
		leftScore = request.data.get('leftScore')
		rightScore = request.data.get('rightScore')

		# Check if Stats instance exists for leftNick
		leftStats = Stats.objects.filter(username=leftNick).first()
		if leftStats:
			# Update game history for leftNick
			GameHistory.objects.create(
				stats=leftStats,
				opponentUsername=rightNick,
				opponentScore=rightScore,
				myScore=leftScore
			)
			# leftStats.nb_of_games_played += 1
			if leftScore > rightScore:
				leftStats.nb_of_victories += 1
			else:
				leftStats.nb_of_defeats += 1
			leftStats.save()

		# Check if Stats instance exists for rightNick
		rightStats = Stats.objects.filter(username=rightNick).first()
		if rightStats:
			# Update game history for rightNick
			GameHistory.objects.create(
				stats=rightStats,
				opponentUsername=leftNick,
				opponentScore=leftScore,
				myScore=rightScore
			)
			# rightStats.nb_of_games_played += 1
			if rightScore > leftScore:
				rightStats.nb_of_victories += 1
			else:
				rightStats.nb_of_defeats += 1
			rightStats.save()
		
		# Response can be adjusted based on what you need to return
		return Response({"message": "Stats updated successfully for existing nicknames"})
	except Exception as e:
		return Response({'error': str(e)}, status=500)
 """


@api_view(['POST'])
def addStats(request):
	try:
		# user = request.user
		# if not user.is_authenticated:
		# 	return Response({'error': 'User not authenticated'}, status=401)

		print(f"In addStats: ", request.data) #TEST to debug #HERE: je ne trouves pas ce print dans make dashboard_logs
		# Fetch data from the request's Results variable
		results_data = request.data.get('Results', {})  # Assuming Results is sent as a nested object

		username = results_data.get('username') #TEST to debug
		print(f"n addStats: Username received: {username}") #TEST to debug
	
		# Extract variables from the Results object
		username = results_data.get('username')
		is_opponent_identified = results_data.get('identified')
		opponent_username = results_data.get('opponent_username')
		my_score = results_data.get('score')
		opponent_score = results_data.get('opponent_score')
		tournament_date = results_data.get('tournament_date')

		# Check if Stats instance exists for the user (username)
		# user_stats = Stats.objects.filter(username=username).first()
		user_stats = Stats.objects.filter(username='karl').first()
		if not user_stats:
			return Response({'error': f'User {username} not found'}, status=404)

		# Check if Stats instance exists for the opponent (opponent_username)
		opponent_stats = Stats.objects.filter(username=opponent_username).first()
		if not opponent_stats:
			return Response({'error': f'Opponent {opponent_username} not found'}, status=404)

		# Create a GameHistory record for the user
		GameHistory.objects.create(
			stats=user_stats,
			opponentUsername=opponent_username,
			opponentScore=opponent_score,
			myScore=my_score,
			date=tournament_date
		)
		
		# Update user stats
		if my_score > opponent_score:
			user_stats.nb_of_victories += 1
		else:
			user_stats.nb_of_defeats += 1
		user_stats.save()

		if (is_opponent_identified == True):
			# Create a GameHistory record for the opponent
			GameHistory.objects.create(
				stats=opponent_stats,
				opponentUsername=username,
				opponentScore=my_score,
				myScore=opponent_score,
				date=tournament_date
			)
			# Update opponent stats
			if opponent_score > my_score:
				opponent_stats.nb_of_victories += 1
			else:
				opponent_stats.nb_of_defeats += 1
			opponent_stats.save()

		return Response({"message": "Stats and Game History updated successfully"})
	except Exception as e:
		return Response({'error': str(e)}, status=500)



#TEST JESS
@api_view(['GET'])
def getGameHistory(request):
	if request.user.is_authenticated:
		serializer = GameHistorySerializer(request.user)
		return Response(serializer.data)
	else:
		return Response({'error': 'User not authenticated'}, status=401)