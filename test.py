from flask import Flask, jsonify, request
import jwt
import datetime
import random
from functools import wraps

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'

# Mock database of users (in practice, use a secure database)
users = {
    'john.doe@example.com': {
        'password': 'password123',
        '2fa_enabled': False,
        '2fa_method': None,
        '2fa_code': None,
    }
}

# Helper function to generate a random 6-digit code for 2FA
def generate_2fa_code():
    code = str(random.randint(100000, 999999))
    print(f"Generated 2FA code: {code}")  # Print the generated code
    return code

# JWT token required decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        except:
            return jsonify({'message': 'Token is invalid!'}), 401

        return f(data['email'], *args, **kwargs)

    return decorated

# Route to authenticate user and issue JWT
@app.route('/login', methods=['POST'])
def login():
    auth = request.json

    if not auth or not auth.get('email') or not auth.get('password'):
        return jsonify({'message': 'Email and password are required!'}), 400

    email = auth['email']
    password = auth['password']
    user = users.get(email)

    if not user or user['password'] != password:
        return jsonify({'message': 'Invalid credentials!'}), 401

    # Generate 2FA code
    user['2fa_code'] = generate_2fa_code()
    print(f"2FA code for {email}: {user['2fa_code']}")

    # Check if 2FA is enabled for the user
    if user['2fa_enabled']:
        return jsonify({'message': 'Two-Factor Authentication required!', '2fa_required': True}), 200
    else:
        # Generate JWT token
        token = jwt.encode({'email': email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({'token': token}), 200

# Route to verify 2FA code and issue JWT
@app.route('/verify', methods=['POST'])
def verify_2fa():
    auth = request.json

    if not auth or not auth.get('email') or not auth.get('code'):
        return jsonify({'message': 'Email and code are required!'}), 400

    email = auth['email']
    code = auth['code']
    user = users.get(email)

    if not user or not user['2fa_enabled'] or not user['2fa_code'] or user['2fa_code'] != code:
        return jsonify({'message': 'Invalid 2FA code!'}), 401

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
