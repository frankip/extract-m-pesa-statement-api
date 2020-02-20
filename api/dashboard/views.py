from flask import request
from werkzeug.utils import secure_filename
from flask_api import status

from . import dashboard
from .models import Users

ALLOWED_EXTENSIONS = set(['txt', 'pdf'])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@dashboard.route('/')
def main_page():
    """
    Render the homepage template on the / route
    """
    return "'homepage-test'"

@dashboard.route('/file-upload', methods=['GET', 'POST'])
def upload_document():
    file = request.files.get('file')
    print('raw',file.content_type)
   

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
