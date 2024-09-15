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

    def to_dict(self):
        return {
            'id': self.id,
            'news_url': self.news_url,
            'image_url': self.image_url,
            'title': self.title,
            'text': self.text,
            'source_name': self.source_name,
            'date': self.date,
            'topics': self.topics,
            'sentiment': self.sentiment,
            'type': self.type,
        }