import os

class Config:
    JWT_SECRET_KEY = '4f8f85bae19b40d69ba3fd5d593b6b93'
    SECRET_KEY = 'd2b1d6a4b9da4721ae111b331d481168'
    MONGODB_SETTINGS = {
        'db': 'Loomina',
        'host': 'mongodb+srv://namita:ULgdPinyedUhGqkt@loomina.iuyus.mongodb.net/loomina?retryWrites=true&w=majority',
        'port': 27017
    }
    DEBUG = True