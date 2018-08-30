from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from UserRepository import UserRepository
from preserver import UserPreserver
from UsersApiController import UserApiController, UsersApiController
from UserNotifier import UserNotifier


app = Flask(__name__)
api = Api(app)
CORS(app)


if __name__ == '__main__':
    notifier = UserNotifier()
    notifier.start()
    user_repository = UserRepository()
    user_preserver = UserPreserver()
    users = user_preserver.load()
    for usr in users:
        user_repository.add(usr)
    controller_args = {'repository': user_repository, 'preserver': user_preserver}
    api.add_resource(UsersApiController, '/users', resource_class_kwargs=controller_args)
    api.add_resource(UserApiController, '/user/<username>', resource_class_kwargs=controller_args)
    app.run('localhost', 9981, debug=True)
