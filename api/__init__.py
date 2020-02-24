# app/__init__.py
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

# local import
from config import app_config

# base directory
basedir = os.path.abspath(os.path.dirname(__file__))
# db variable initialization
db = SQLAlchemy()

def create_app(config_name):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'africas.sqlite')
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'

    # app.config.from_pyfile('config.py')
    db.init_app(app)

    with app.app_context():
        db.create_all()

    from .admin import admin as admin_blueprint
    from .auth import auth as auth_blueprint
    from .dashboard import dashboard as dashboard_blueprint
    
    
    app.register_blueprint(admin_blueprint, url_prefix='/admin')
    app.register_blueprint(auth_blueprint, url_prefix='/auth')
    app.register_blueprint(dashboard_blueprint, url_prefix='/')



    return app