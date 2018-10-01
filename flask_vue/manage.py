from flask_script import Manager
from angularity import create_app
from flask_migrate import Migrate, MigrateCommand

app = create_app('angularity.config.DevConfig')

manager = Manager(app)

migrate = Migrate(app)

@manager.shell
def make_shell_context():
	return dict(app=app)

if __name__ == '__main__':
	manager.run()