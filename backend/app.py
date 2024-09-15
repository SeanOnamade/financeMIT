from flask import Flask
from prompting.prompt import *

app = Flask(__name__)

@app.route('/') # ‘https://www.google.com/‘
def home():
	return "This is the backend server for Pocket!"

@app.route('/analyze/stock/<string:stock>')
def show_post(stock):
    return get_stock_trend(stock)


app.run(port=5000)