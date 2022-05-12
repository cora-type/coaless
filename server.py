import static.scraper as scraper, json
from flask import Flask, render_template, request

# Setup flask server
app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')

# Setup url route which will grab POST request from HTML input
@app.route('/search', methods = ['POST'])
def search():
	result = scraper.link_scraper(request.form['name'] )
	return json.dumps(result)

if __name__ == "__main__":
	app.run()

