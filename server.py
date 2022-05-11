import static.scraper as scraper, json
from flask import Flask, render_template, request

# Setup flask server
app = Flask(__name__)

@app.route('/')
def home():
	return render_template('index.html')

# Setup url route which will grab POST request from HTML input
@app.route('/lookup', methods = ['POST'])
def search():
	data = request.get_json()
	# Data variable contains the
	# data from the node server
	result = scraper.link_scraper(data) # calculate the sum

	# Return data in json format, result is an array of objects
	return json.dumps({"result":result})

if __name__ == "__main__":
	app.run()

