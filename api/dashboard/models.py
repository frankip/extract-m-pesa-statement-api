"""
This files handles all the database logic and instances
"""
from datetime import datetime, timedelta
import jwt
from api.auth.models import Users

from api import db

class UserRecords(db.Model):
    """
    This class handles all the logic and methods
    associated with a user
    """
    __tablename__ = 'user_records_db'

    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Integer, db.ForeignKey(Users.id))
    date_period = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    data_records = db.Column(db.String())
    

    def __init__(self, user, date_period, created_at, data_records):
        self.user = user
        self.date_period = date_period
        self.created_at = created_at
        self.data_records = data_records