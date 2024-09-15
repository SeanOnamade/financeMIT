from flask import Flask, jsonify
from flask_cors import CORS
from prompting.prompt import get_stock_trend
from custom_news_feed.custom_news import get_custom_news

app = Flask(__name__)
CORS(app, resources={r"/stock/*": {"origins": "http://localhost:3000"}})

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
	
@app.route('/stock/<ticker>', methods=['GET'])
def get_stock_news(ticker):
    # Assuming all news is returned regardless of ticker for simplicity
    news = get_custom_news()
    filtered_news = [article.__dict__ for article in news if ticker in article.title]  # Example filter
    return jsonify({"choices": filtered_news})
# return jsonify({"choices": [news_item.__dict__ for news_item in news]})

if __name__ == '__main__':
	app.run(host='127.0.0.1', port=5000, debug=True)