from flask import Flask, request
from flask_restful import Resource, Api
from json import dumps
import neurlart
import time


app = Flask(__name__)
api = Api(app)

class NeuralArt(Resource):
    def get(self):
        fileName = request.args.get('file', default='newtest.jpg', type = str)
        print( "calling neuralart  with file: " + fileName)
        starttime = time.time()
        neurlart.main(fileName)
        print("Time Taken: %s seconds"  % (time.time() - starttime))
        return 'success', 200

api.add_resource(NeuralArt, '/neuralart')

if __name__ == '__main__':
     app.run(host='0.0.0.0', port='5002')
