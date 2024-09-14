import pickle
import requests
from news_article import NewsArticle

api_key = "tmy1t6qddm2oqp4vdru8i58khd5ig6qvgobfh2e1"
news_to_return = []

def call_news_api(news_url, file_name):
    response = requests.get(news_url)
    if response.status_code == 200:
        raw_data = response.json()
        with open(file_name, 'wb') as f:
            pickle.dump(raw_data, f)
        print(f"Response saved to {file_name}")
    else:
        print(f"Failed to retrieve data. HTTP Status code: {response.status_code}")


# GENERAL NEWS
general_news_url = f"https://stocknewsapi.com/api/v1/category?section=general&items=3&page=1&token=tmy1t6qddm2oqp4vdru8i58khd5ig6qvgobfh2e1"
pickle_file_for_general_news = 'general.pickle'

# run only once and comment out to avoid running into our api limits
# call_news_api(general_news_url, pickle_file_for_general_news)

# load news articles from pickle file and parse
raw_data = None
with open(pickle_file_for_general_news, 'rb') as f:
    raw_data = pickle.load(f)
for i in range(2):
    new_news = NewsArticle(
        id = i,
        news_url = raw_data['data'][i]['news_url'],
        image_url = raw_data['data'][i]['image_url'],
        title = raw_data['data'][i]['title'],
        text = raw_data['data'][i]['text'],
        source_name = raw_data['data'][i]['source_name'],
        date = raw_data['data'][i]['date'],
        topics = raw_data['data'][i]['topics'],
        sentiment = raw_data['data'][i]['sentiment'],
        type = raw_data['data'][i]['type'],
    )
    news_to_return.append(new_news)

# SECTOR NEWS

sector_news_url = f""
pickle_file_for_sector_news = 'sector.pickle'



# STOCK NEWS



def get_custom_news():
    return news_to_return


