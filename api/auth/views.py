from . import auth
from .models import Users
from .user_auth import (
    registration,
    login,
    # logout,
    reset_password
)


@auth.route('/')
def homepage():
    """
    Render the homepage template on the / route
    """
    return "'authentication'"

