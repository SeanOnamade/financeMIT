import pickle
import random
import requests
from news_article import NewsArticle
from asset import Asset

api_key = "tmy1t6qddm2oqp4vdru8i58khd5ig6qvgobfh2e1"
news_to_return = []
seen = set()

fake_portfolio = [
    Asset(ticker="NVDA", sector="Technology"),
    Asset(ticker="AMZN", sector="Technology"),
    Asset(ticker="AAPL", sector="Technology"),
    Asset(ticker="GOOG", sector="Technology"),
    Asset(ticker="MSFT", sector="Technology"),
    Asset(ticker="TSLA", sector="Technology"),
    Asset(ticker="META", sector="Technology"),
    Asset(ticker="GS",   sector="Financial"),
]

def call_news_api(news_url, file_name):
    response = requests.get(news_url)
    if response.status_code == 200:
        raw_data = response.json()
        with open(file_name, 'wb') as f:
            pickle.dump(raw_data, f)
        print(f"Response saved to {file_name}")
    else:
        print(f"Failing Url: {news_url}")
        print(f"Failed to retrieve data. HTTP Status code: {response.status_code}")

def add_news_for_return(file_name, nb_files):
    if nb_files == 0: return
    
    raw_data = None
    with open(file_name, 'rb') as f:
        raw_data = pickle.load(f)

    nb_files = min(nb_files, len(raw_data['data']))
    
    for i in range(nb_files):
        article = raw_data['data'][i]
        new_news = NewsArticle(
            id = i,
            news_url    = article.get('news_url', '#'),
            image_url   = article.get('image_url', 'https://placehold.jp/256x256.png'),
            title       = article.get('title', 'No Title'),
            text        = article.get('text', 'No Content'),
            source_name = article.get('source_name', 'Unknown Source'),
            date        = article.get('date', ''),
            topics      = article.get('topics', []),
            sentiment   = article.get('sentiment', 'Neutral'),
            type        = article.get('type', 'General'),
        )
        if new_news.title not in seen:
            seen.add(new_news.title)
            news_to_return.append(new_news)
    print(f"Added {nb_files} files from {file_name} to results")

def get_tickers_in_portfolio(portfolio):
    tickers = []
    for asset in portfolio:
        tickers.append(asset.ticker)
    return tickers

# GENERAL NEWS
general_news_url = f"https://stocknewsapi.com/api/v1/category?section=general&items=3&page=1&token=tmy1t6qddm2oqp4vdru8i58khd5ig6qvgobfh2e1"
pickle_file_for_general_news = 'pickles/general.pickle'

# call_news_api(general_news_url, pickle_file_for_general_news) # run only once and comment out to avoid running into our api limits
add_news_for_return(pickle_file_for_general_news, 10)

# STOCK NEWS
tickers = get_tickers_in_portfolio(fake_portfolio)
for ticker in tickers:
    ticker_url = f"https://stocknewsapi.com/api/v1?tickers={ticker}&items=3&page=1&token=tmy1t6qddm2oqp4vdru8i58khd5ig6qvgobfh2e1"
    # call_news_api(ticker_url, f"pickles/{ticker}.pickle")
    add_news_for_return(f"pickles/{ticker}.pickle", 3)

# shuffle results, and store them for persistence
random.shuffle(news_to_return)
with open("pickles/news_to_return.pickle", 'wb') as f:
    pickle.dump(news_to_return, f)
    print("Final results saved to return news.pickle")

# def get_custom_news():
#     return news_to_return

class NewsArticle:
    def __init__(self, id, news_url, image_url, title, text, source_name, date, topics, sentiment, type):
        self.id = id
        self.news_url = news_url
        self.image_url = image_url
        self.title = title
        self.text = text
        self.source_name = source_name
        self.date = date
        self.topics = topics
        self.sentiment = sentiment
        self.type = type

def get_custom_news():
    # Load the news articles from the pickle file
    with open("pickles/news_to_return.pickle", 'rb') as f:
        news_list = pickle.load(f)
    return news_list
