from flask import request
from werkzeug.utils import secure_filename
from flask_api import status

from . import dashboard
from api.auth.models import Users
from .models import UserRecords

from pprint import pprint

from .utils import convert_pdf_to_txt

ALLOWED_EXTENSIONS = set(['txt', 'pdf'])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def authentication_request():
    """Helper class that gets the access token"""
    # Get the access token from the header
    auth_header = request.headers.get('Authorization')
    if auth_header:
        try:
            access_token = auth_header.split(' ')[1]
        except IndexError:
            return {"message": "Token is malformed"}, status.HTTP_401_UNAUTHORIZED
    else:
        access_token = ''

    return access_token


def get_response(event_query):
    """Heleper method for looping over Get methods"""
    response = []
    for records in event_query:
        obj = {
            'id': records.id,
            'user': records.user,
            'in': records.paid_in,
            'out': records.paid_out
        }
        response.append(obj)
    return response


@dashboard.route('/')
def main_page():
    """
    Render the homepage template on the / route
    """
    return "'homepage-test'"

@dashboard.route('/file-upload', methods=['GET', 'POST'])
def upload_document():
    access_token = authentication_request()
    # password = request.args
    password2 = request.form.get('password')
    # password3 = request.files
    # password4 = request.values
    # password5 = request.json


    # print('===args', password)
    # print('===form', password2)
    # print('==files', password3)
    # print('==values', password4)
    # print('==json', password5)
    
    # file = request.files.get('file')


    if access_token:
        # Attempt to decode the token and get the User ID
        user_id = Users.decode_token(access_token)

        if not isinstance(user_id, str):
            # Go ahead and handle the request, the user is authenticated
            if request.method == 'POST':
                # check if the post request has the file part
                if 'file' not in request.files:
                    resp = {'message' : 'No file part in the request'}
                    return resp, status.HTTP_400_BAD_REQUEST

                file = request.files.get('file')

                # if user does not select file, browser also
                # submit an empty part without filename
                if file.filename == '':
                    resp = {'message' : 'No file part was selected'}
                    return resp, status.HTTP_400_BAD_REQUEST

                if file and allowed_file(file.filename):

                    filename = secure_filename(file.filename)

                    text_data= convert_pdf_to_txt(file, password2)

                    if isinstance(text_data, dict):
                        return text_data
                    else:
                        paid_in, paid_out, date_period = text_data

                        data = UserRecords(paid_in, paid_out, date_period,  user=user_id)
                        data.save()

                        resp = {'message' : 'File successfully uploaded'}
                        return resp, status.HTTP_201_CREATED

                else:
                    resp = {'message' : 'Allowed file types are txt, pdf'}
                    return resp,  status.HTTP_400_BAD_REQUEST


            # Request.method == 'GET'
            # GET all the events created by this user
            records = UserRecords.get_all_user_records(user_id)

            # Get response object from helper method get_response()
            results = get_response(records)

            response = {
                'message': "Fetched all records succesful",
                'response' : results
            }

            return response, status.HTTP_200_OK
        else:
            # user is not legit, so the payload is an error message
            message = user_id
            response = {
                'message': message
            }
            return response, status.HTTP_401_UNAUTHORIZED


