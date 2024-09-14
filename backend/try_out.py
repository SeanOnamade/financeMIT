import pickle

file_name = "news_to_return.pickle"
raw_data = None
with open(file_name, 'rb') as f:
    raw_data = pickle.load(f)

for news in raw_data:
    print(news.title)