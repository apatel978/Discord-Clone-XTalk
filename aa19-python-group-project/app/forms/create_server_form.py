from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Server

class ServerForm(FlaskForm):
    preview = StringField('Preview Image')
    name = StringField('Server Name', validators=[DataRequired()])
