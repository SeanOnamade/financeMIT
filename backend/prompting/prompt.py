import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve API key from environment variable
PERPLEXITY_KEY = os.getenv("PERPLEXITY_KEY")

def get_stock_trend(message: str) -> str:
    """
    Get the stock trend and related news from Perplexity API.
    
    Args:
        message (str): The stock symbol to query.
        
    Returns:
        str: The response content from the API.
    """
    
    url = "https://api.perplexity.ai/chat/completions"

    payload = {
        "model": "llama-3.1-sonar-small-128k-online",
        "messages": [
            {
                "role": "system",
                "content": "You are a finance stock trading machine that accepts a stock as input, then searches online what news articles are relevant to the stock and whether the stock is bullish or bearish. Your response is a sentence that describe the overal trend of the stock, then bullet points of the news article urls. Organize this in a JSON dictionary format."
            },
            {
                "role": "user",
                "content": message
            }
        ],
        "max_tokens": 1000,
        "temperature": 0.2,
        "top_p": 0.93,
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
    
    # Make a POST request to the API
    response = requests.post(url, json=payload, headers=headers)
    
    # Return the content of the response
    return response.json()

def ask_perplexity(message: str) -> str:
    """
    Get the stock trend and related news from Perplexity API.
    
    Args:
        message (str): The stock symbol to query.
        
    Returns:
        str: The response content from the API.
    """
    
    url = "https://api.perplexity.ai/chat/completions"

    payload = {
        "model": "llama-3.1-sonar-small-128k-online",
        "messages": [
            {
                "role": "system",
                "content": "You are a finance stock trading expert messaging service named Rocket Chat Live. Be concise and informative. Your response should be a short text message."
            },
            {
                "role": "user",
                "content": message
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
    
    # Make a POST request to the API
    response = requests.post(url, json=payload, headers=headers)
    
    # Return the content of the response
    return response.json()

# Example usage
# if __name__ == "__main__":
#     stock_message = "AAPL"
#     result = get_stock_trend(stock_message)
#     print(result)