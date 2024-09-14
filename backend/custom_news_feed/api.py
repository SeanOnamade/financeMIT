import pickle
from flask import Flask, jsonify

app = Flask(__name__)

def get_custom_news():
    file_name = "pickles/news_to_return.pickle"
    news_data = None
    with open(file_name, 'rb') as f:
        news_data = pickle.load(f)

    print("Providing the articles:")
    for news in news_data:
        print(news.title)
    return news_data

# A route for the root URL
@app.route('/')
def home():
    return "Welcome to the Flask API"

# Create a route to expose the function
@app.route('/api/articles_for_custom_feed', methods=['GET'])
def fetch_data():
    data = get_custom_news()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug = True)

'''
The data returned is a list of NewsArticle objects.
class NewsArticle():
    def __init__(
        self,
        id,
        news_url,
        image_url,
        title,
        text,
        source_name,
        date,
        topics,
        sentiment,
        type,
    ):
'''
