from flask import request
from werkzeug.utils import secure_filename
from flask_api import status

from . import dashboard
from .models import Users

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

@dashboard.route('/')
def main_page():
    """
    Render the homepage template on the / route
    """
    return "'homepage-test'"

@dashboard.route('/file-upload', methods=['GET', 'POST'])
def upload_document():
    access_token = authentication_request()
    
    file = request.files.get('file')

    if access_token:
        # Attempt to decode the token and get the User ID
        user_id = Users.decode_token(access_token)
        print('raw',user_id)
        if not isinstance(user_id, str):
            # Go ahead and handle the request, the user is authenticated
            if request.method == 'POST':
                # check if the post request has the file part
                if 'file' not in request.files:
                    resp = {'message' : 'No file part in the request'}
                    return resp, status.HTTP_400_BAD_REQUEST

                # file = request.files.get('file')

                # if user does not select file, browser also
                # submit an empty part without filename
                if file.filename == '':
                    resp = {'message' : 'No file part was selected'}
                    return resp, status.HTTP_400_BAD_REQUEST

                if file and allowed_file(file.filename):
                    filename = secure_filename(file.filename)
                    file.save(filename)
                    print('filename', filename)

                    resp = {'message' : 'File successfully uploaded'}
                    print('ssss', dir(file))
                    return resp, status.HTTP_201_CREATED

                else:
                    resp = {'message' : 'Allowed file types are txt, pdf, png, jpg, jpeg, gif'}
                    resp.status_code = 400
                    return resp
                
                return "'hoyee'"
        else:
            # user is not legit, so the payload is an error message
            message = user_id
            response = {
                'message': message
            }
            return response, status.HTTP_401_UNAUTHORIZED


"""
we have created Auth, and upload
upload is working fine but we need a way to extract data
we can also use the with open comand

maybe if we try pasing the raw file as we initilaize the pdfpy2
also check pdfpy2 password it has something like decode

what if we get the file and creat a utils file that extracts

then look how to join  with a front end

"""