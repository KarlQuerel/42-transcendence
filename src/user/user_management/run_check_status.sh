while true; do
	echo "Running check_user_status at $(date)" >> /tmp/check_user_status.log
	python manage.py check_user_status
	sleep 60
done