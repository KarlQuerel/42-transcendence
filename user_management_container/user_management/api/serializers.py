from rest_framework import serializers
from base.models import User

class userSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = '__all__'