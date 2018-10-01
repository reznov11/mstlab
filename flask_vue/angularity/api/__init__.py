from flask import Blueprint
api_route = Blueprint('api',__name__,static_folder='../static')
from . import views