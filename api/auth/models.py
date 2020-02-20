"""
This files handles all the database logic and instances
"""
from datetime import datetime, timedelta
import jwt
from passlib.apps import custom_app_context as pwd_context

from api import db

class Users(db.Model):
    """
    This class handles all the logic and methods
    associated with a user
    """
    __tablename__ = 'user_db'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256), nullable=False, unique=True)
    password = db.Column(db.String(256), nullable=False)
    first_name = db.Column(db.String(256), nullable=False)
    last_name = db.Column(db.String(256), nullable=False)

    def __init__(self, first_name, last_name, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password

    @staticmethod
    def hash_password(password):
        """
        This method hashes the password which will be 
        stored in the db as password
        """
        return pwd_context.encrypt(password)
        # return password
    def save(self):
        """Creates a new user and saves to the database"""
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def check_user(email):
        """
        This method takes in a email and
        checks if its in the database
        """
        return Users.query.filter_by(email=email).first()

    def verify_password(self, password):
        """
        check pasword provided with hash in db
        """
        return pwd_context.verify(password, self.password)

    def generate_token(self, user_id):
        """Generating the access token"""
        try:
            #set up payload with an expiration time
            payload = {
                'exp': datetime.utcnow() + timedelta(minutes=50),
                'iat': datetime.utcnow(),
                'sub': user_id
            }
            # print('dvx', db['SECRET_KEY'])
            # create the byte string token using the payload and the SECRET key
            jwt_string = jwt.encode(
                payload,
               "db.config.get('SECRET_KEY')",
                algorithm='HS256'
            )
            return jwt_string

        except Exception as error:
            # return an error in string format if an exception occurs
            return str(error)

    def get_full_names(self):
        """Returns the full namesod user"""
        return self.first_name +' '+ self.last_name

    @staticmethod
    def decode_token(token):
        '''Decodes the access token from the Authorization header.'''
        try:
            # try to decode the token using our SECRET variable
            payload = jwt.decode(token, app.secret_key)
            blacklisted_token = BlackListToken.check_black_list(token)
            if blacklisted_token:
                return "You have logged out, Please log in to continue"
            return payload['sub']
        except jwt.ExpiredSignatureError:
            # The token is expired, return an error string
            return "Expired token. Please login to get a new token"
        except jwt.InvalidTokenError:
            #The token is invalid, return an error string
            return "Invalid token. Please register or login"

    def __repr__(self):
        return "<User: {}>".format(self.get_full_names())