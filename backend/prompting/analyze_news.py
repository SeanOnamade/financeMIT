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
            "content": "You are a finance stock trading machine that accepts a stock as input, then searches online what news articles are relevant to the stock and whether the stock is bullish or bearish. Your response is a sentence that describe the overal trend of the stock, then bullet points of the news article urls and sub bullet points of the main points taken from those news articles."
        },
        {
            "role": "user",
            "content": "APPL"
        }
    ],
    "max_tokens": 1000,
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

# print(response.text)
print(response.json()["choices"][0]["message"]["content"])