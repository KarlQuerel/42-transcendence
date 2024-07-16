from flask import Flask, jsonify, request
import jwt
import datetime
import random
from functools import wraps
from colorama import init, Fore, Style

init()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'

# Mock database of users (in practice, use a secure database)
users = {
	'yako.cherry@example.com': {
		'password': 'password123',
		'2fa_enabled': True,  # Enable 2FA for testing
		'2fa_method': None,
		'2fa_code': None,
	}
}

# Messages
TOKEN_MISSING_MSG = 'Token is missing!'
TOKEN_FORMAT_INCORRECT_MSG = 'Token format is incorrect!'
TOKEN_EXPIRED_MSG = 'Token has expired!'
TOKEN_INVALID_MSG = 'Token is invalid!'
EMAIL_PASSWORD_REQUIRED_MSG = 'Email and password are required!'
INVALID_CREDENTIALS_MSG = 'Invalid credentials!'
TWO_FA_REQUIRED_MSG = 'Two-Factor Authentication required!'
EMAIL_CODE_REQUIRED_MSG = 'Email and code are required!'
INVALID_TWO_FA_CODE_MSG = 'Invalid 2FA code!'

# Helper function to generate a random 6-digit code for 2FA
def generate_2fa_code():
	code = str(random.randint(100000, 999999))
	print(Fore.CYAN + f"Generated 2FA code: {code}" + Style.RESET_ALL)  # Print the generated code
	return code

# JWT token required decorator
def token_required(f):
	@wraps(f)
	def decorated(*args, **kwargs):
		token = request.headers.get('Authorization')
		if not token:
			return jsonify({'message': TOKEN_MISSING_MSG}), 401

		# Ensure the token is in the correct format
		if token.startswith("Bearer "):
			token = token.split(" ")[1]
		else:
			return jsonify({'message': TOKEN_FORMAT_INCORRECT_MSG}), 401

		try:
			data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
		except jwt.ExpiredSignatureError:
			return jsonify({'message': TOKEN_EXPIRED_MSG}), 401
		except jwt.InvalidTokenError:
			return jsonify({'message': TOKEN_INVALID_MSG}), 401

		return f(data['email'], *args, **kwargs)

	return decorated

# Route to authenticate user and issue JWT
@app.route('/login', methods=['POST'])
def login():
	auth = request.json

	if not auth or not auth.get('email') or not auth.get('password'):
		return jsonify({'message': EMAIL_PASSWORD_REQUIRED_MSG}), 400

	email = auth['email']
	password = auth['password']
	user = users.get(email)

	if not user or user['password'] != password:
		print(Fore.RED + INVALID_CREDENTIALS_MSG + Style.RESET_ALL)
		return jsonify({'message': INVALID_CREDENTIALS_MSG}), 401

	# Generate 2FA code
	user['2fa_code'] = generate_2fa_code()
	print(Fore.YELLOW + f"2FA code for {email}: {user['2fa_code']}" + Style.RESET_ALL)

	# Check if 2FA is enabled for the user
	if user['2fa_enabled']:
		return jsonify({'message': TWO_FA_REQUIRED_MSG, '2fa_required': True}), 200
	else:
		# Generate JWT token
		token = jwt.encode({'email': email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'], algorithm='HS256')
		return jsonify({'token': token}), 200

# Route to verify 2FA code and issue JWT
@app.route('/verify', methods=['POST'])
def verify_2fa():
	auth = request.json

	if not auth or not auth.get('email') or not auth.get('code'):
		return jsonify({'message': EMAIL_CODE_REQUIRED_MSG}), 400

	email = auth['email']
	code = auth['code']
	user = users.get(email)

	if not user or not user['2fa_enabled'] or not user['2fa_code'] or user['2fa_code'] != code:
		print(Fore.RED + INVALID_TWO_FA_CODE_MSG + Style.RESET_ALL)
		return jsonify({'message': INVALID_TWO_FA_CODE_MSG}), 401

	# Reset 2FA code after successful verification
	user['2fa_code'] = None

	# Generate JWT token
	token = jwt.encode({'email': email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'], algorithm='HS256')
	return jsonify({'token': token}), 200

# Protected route example
@app.route('/protected', methods=['GET'])
@token_required
def protected(email):
	return jsonify({'message': f'Hello, {email}! This is a protected resource.'}), 200

if __name__ == '__main__':
	app.run(debug=True)
