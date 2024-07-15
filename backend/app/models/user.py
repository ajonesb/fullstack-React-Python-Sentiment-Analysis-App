# This is a simple in-memory user model. In a real application, you'd use a database.
users = {}

class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password

    @classmethod
    def create(cls, username, password):
        user = cls(username, password)
        users[username] = user
        return user

    @classmethod
    def get_by_username(cls, username):
        return users.get(username)