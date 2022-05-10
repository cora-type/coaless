import main, json
from flask import Flask, request

# Setup flask server
app = Flask(__name__)

# Setup url route which will calculate
# total sum of array.
@app.route('/lookup', methods = ['POST'])
def search():
	data = request.get_json()
	print(data)
	# Data variable contains the
	# data from the node server
	result = main.link_scraper(data) # calculate the sum

	# Return data in json format, result is an array of objects
	return json.dumps({"result":result})

if __name__ == "__main__":
	app.run(port=5000)

