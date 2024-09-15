import requests
import dotenv
import os

from dotenv import load_dotenv

load_dotenv()

PERPLEXITY_KEY = os.getenv("PERPLEXITY_KEY")

url = "https://api.perplexity.ai/chat/completions"

payload = {
    "model": "llama-3.1-sonar-small-128k-online",
    "messages": [
        {
            "role": "system",
            "content": "You are a finance stock trading machine that accepts news articles and stocks as input, then determines what stocks and industries the articles refer to and whether or not it is bullish or bearish. You format your response in a two sentences summary of the article and your decision then 5 bullet points considered for or against your hypothesis."
        },
        {
            "role": "user",
            "content": "I own 20 APPL. What should I do based on this article: https://finance.yahoo.com/news/apple-inc-aapl-best-blue-163931406.html"
        }
    ],
    "max_tokens": 300,
    "temperature": 0.2,
    "top_p": 0.9,
    "return_citations": True,
    "search_domain_filter": ["perplexity.ai"],
    "return_images": False,
    "return_related_questions": False,
    "search_recency_filter": "month",
    "top_k": 0,
    "stream": False,
    "presence_penalty": 0,
    "frequency_penalty": 1
}
headers = {
    "Authorization": "Bearer " + PERPLEXITY_KEY,
    "Content-Type": "application/json"
}

response = requests.request("POST", url, json=payload, headers=headers)

print(response.text)