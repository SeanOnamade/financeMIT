from flask import Flask, jsonify
from flask_cors import CORS
from prompting.prompt import *

app = Flask(__name__)
CORS(app)

@app.route('/stock/<string:stock>')
def show_post(stock):
	app.logger.info(f"Received request for stock: {stock}")
	try:
		result = get_stock_trend(stock)
		app.logger.info(f"Result: {result}")
		return jsonify(result)
	except Exception as e:
		app.logger.error(f"Error processing request: {str(e)}")
		return jsonify({"error": str(e)}), 500
	
@app.route('/ask/<string:prompt>')
def ask_question(prompt):
	app.logger.info(f"Received request for ask: {prompt}")
	try:
		result = ask_perplexity(prompt)
		app.logger.info(f"Result: {result}")
		# return "beans"
		return jsonify(result)
	except Exception as e:
		app.logger.error(f"Error processing request: {str(e)}")
		return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
	app.run(host='127.0.0.1', port=5000, debug=True)