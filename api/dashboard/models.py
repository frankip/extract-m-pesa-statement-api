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
    # data_records = db.Column(db.String())
    paid_in = db.Column(db.PickleType())
    paid_out = db.Column(db.PickleType())
    user = db.Column(db.Integer, db.ForeignKey(Users.id))
    
    # date_period = db.Column(db.DateTime, default=db.func.current_timestamp())
    # created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    

    def __init__(self, paid_in, paid_out, user):
        # self.date_period = date_period
        # self.created_at = created_at
        self.paid_in = paid_in
        self.paid_out = paid_out
        self.user = user

    def save(self):
        """Creates a new user and saves to the database"""
        db.session.add(self)
        db.session.commit()

    
    @staticmethod
    def get_all_user_records(user_id):
        """
        Get all the events created by the user
        """
        return UserRecords.query.filter_by(user=user_id).all()
