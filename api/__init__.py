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
app = Flask(__name__, instance_relative_config=True)
db = SQLAlchemy(app)

def create_app(config_name, db_path):
    app.config.from_object(app_config[config_name])
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_path
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'


    from .admin import admin as admin_blueprint
    from .auth import auth as auth_blueprint
    from .dashboard import dashboard as dashboard_blueprint
    
    
    app.register_blueprint(admin_blueprint, url_prefix='/admin')
    app.register_blueprint(auth_blueprint, url_prefix='/auth')
    app.register_blueprint(dashboard_blueprint, url_prefix='/')



    return app