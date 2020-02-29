import os

from api import create_app

config_name = os.getenv('APP_SETTINGS') # config_name = "development"
basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, 'africas.sqlite')


app = create_app(config_name, db_path)

if __name__ == '__main__':
    app.run()