import server.main as main, json
from flask import Flask, request

# Setup flask server
app = Flask(__name__)

@app.route('/')
def home():
	return "Flask heroku app"

# Setup url route which will grab POST request from HTML input
@app.route('/lookup', methods = ['POST'])
def search():
	data = request.get_json()
	# Data variable contains the
	# data from the node server
	result = main.link_scraper(data) # calculate the sum

	# Return data in json format, result is an array of objects
	return json.dumps({"result":result})

if __name__ == "__main__":
	app.run()

