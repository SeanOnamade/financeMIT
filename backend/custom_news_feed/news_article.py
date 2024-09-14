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