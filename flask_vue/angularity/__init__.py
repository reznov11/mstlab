from flask import Flask

def create_app(config_object):
	app = Flask(__name__)
	app.config.from_object(config_object)

	jinja_options = app.jinja_options.copy()
	jinja_options.update(
		dict(
			variable_start_string='(%',
			variable_end_string='%)'
		)
	)
	app.jinja_options = jinja_options

	######## Register Application Routes ########
	
	# API blueprint route
	from .api import api_route
	app.register_blueprint(api_route, prefix_url='/')

	# Return the application object context
	return app