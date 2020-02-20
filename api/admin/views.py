from . import admin


@admin.route('/')
def homepage():
    """
    Render the homepage template on the / route
    """
    return "'Hello, at admins World!'"
