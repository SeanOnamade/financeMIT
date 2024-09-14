import pickle
import requests
from news_article import NewsArticle
from asset import Asset

api_key = "tmy1t6qddm2oqp4vdru8i58khd5ig6qvgobfh2e1"
news_to_return = []

fake_portfolio = [
    Asset(ticker="NVDA", sector="Technology"),
    Asset(ticker="AMZN", sector="Technology"),
    Asset(ticker="AAPL", sector="Technology"),
    Asset(ticker="GOOG", sector="Technology"),
    Asset(ticker="MRNA", sector="Healthcare"),
    Asset(ticker="NVO",  sector="Healthcare"),
    Asset(ticker="BAC",  sector="Financial"),
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
        print(f"Failed to retrieve data. HTTP Status code: {response.status_code}")

def add_news_for_return(file_name, nb_files):
    if nb_files == 0: return
    
    raw_data = None
    with open(file_name, 'rb') as f:
        raw_data = pickle.load(f)
    for i in range(nb_files):
        new_news = NewsArticle(
            id = i,
            news_url    = raw_data['data'][i]['news_url'],
            image_url   = raw_data['data'][i]['image_url'],
            title       = raw_data['data'][i]['title'],
            text        = raw_data['data'][i]['text'],
            source_name = raw_data['data'][i]['source_name'],
            date        = raw_data['data'][i]['date'],
            topics      = raw_data['data'][i]['topics'],
            sentiment   = raw_data['data'][i]['sentiment'],
            type        = raw_data['data'][i]['type'],
        )
        news_to_return.append(new_news)

def get_industries_in_portfolio(portfolio):
    counts = [0 for i in range(5)]
    for asset in portfolio:
        if asset.sector == "Technology":
            counts[0] += 1
        elif asset.sector == "Healthcare":
            counts[1] += 1
        elif asset.sector == "Financial":
            counts[2] += 1
        elif asset.sector == "Basic Materials":
            counts[3] += 1
        else:
            counts[4] += 1
    return counts

def get_tickers_in_portfolio(portfolio):
    tickers = []
    for asset in portfolio:
        tickers.append(asset.ticker)
    return tickers

# GENERAL NEWS

general_news_url = f"https://stocknewsapi.com/api/v1/category?section=general&items=10&page=1&token=tmy1t6qddm2oqp4vdru8i58khd5ig6qvgobfh2e1"
pickle_file_for_general_news = 'general.pickle'

call_news_api(general_news_url, pickle_file_for_general_news) # run only once and comment out to avoid running into our api limits
add_news_for_return(pickle_file_for_general_news, 10)


# SECTOR NEWS

tech_news_url = f""
pickle_file_for_tech_news = 'tech.pickle'
call_news_api(tech_news_url, pickle_file_for_tech_news)

health_news_url = f""
pickle_file_for_health_news = 'health.pickle'
call_news_api(health_news_url, pickle_file_for_health_news)

fin_news_url = f""
pickle_file_for_fin_news = 'fin.pickle'
call_news_api(fin_news_url, pickle_file_for_fin_news)

basicmat_news_url = f""
pickle_file_for_basicmat_news = 'basicmat.pickle'
call_news_api(basicmat_news_url, pickle_file_for_basicmat_news)

industry_count = get_industries_in_portfolio(fake_portfolio)
t, h, f, b = industry_count[0], industry_count[1], industry_count[2], industry_count[3]
n = len(fake_portfolio)
t, h, f, b = (t//n)*10, (h//n)*10, (f//n)*10, (b//n)*10

add_news_for_return(pickle_file_for_tech_news, t)
add_news_for_return(pickle_file_for_health_news, h)
add_news_for_return(pickle_file_for_fin_news, f)
add_news_for_return(pickle_file_for_basicmat_news, b)




# STOCK NEWS



def get_custom_news():
    return news_to_return


