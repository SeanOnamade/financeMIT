import React, { useEffect, useState } from 'react';
import FeedArticle from '../components/FeedArticle';

function Newsfeed() {
    const [articles, setArticles] = useState([]);
    const [stockSymbol, setStockSymbol] = useState('AAPL');

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/stock/${stockSymbol}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched data:", data);

                if (data.choices && data.choices.length > 0) {
                    const content = data.choices[0].message.content;
                    console.log("Raw content:", content);

                    // Extract URLs from the content
                    const links = extractLinksFromContent(content);
                    console.log("Extracted links:", links);

                    // Limit to the first 3 unique links
                    const uniqueLinks = [...new Set(cleanedLinks)].slice(0, 3);
                    console.log("Unique links:", uniqueLinks);

                    // Fetch additional details for each link
                    Promise.all(uniqueLinks.map(link => fetchArticleDetails(link)))
                        .then(fetchedArticles => {
                            setArticles(fetchedArticles);
                        })
                        .catch(error => {
                            console.error("Error fetching article details: ", error);
                            setArticles([]);
                        });
                } else {
                    console.error("Unexpected data format:", data);
                    setArticles([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching articles: ", error);
                setArticles([]);
            });
    }, [stockSymbol]);

    function cleanUrl(url) {
        return url.replace(/\)$/, ''); // Remove trailing ')'
    }
    
    // Example usage:
    const links = [
        'https://finance.yahoo.com/news/jim-cramer-apple-inc-aapl-150102025.html)',
        'https://www.morningstar.com/stocks/xnas/aapl/quote)',
        'https://www.youtube.com/watch?v=waofjhoY3I0)'
    ];
    
    const cleanedLinks = links.map(cleanUrl);
    console.log(cleanedLinks);
    

    const extractLinksFromContent = (content) => {
        const linkPatterns = [
            /https:\/\/[^\s]+/g,
            /www\.[^\s]+/g
        ];
        let links = [];
        linkPatterns.forEach(pattern => {
            const matches = content.match(pattern);
            if (matches) {
                links = links.concat(matches);
            }
        });
        return links.map(link => link.replace(/\)$/, '')); // Clean links here
    };

    const fetchArticleDetails = async (url) => {
        try {
            // Validate URL format
            try {
                new URL(url); // Throws if invalid
            } catch (e) {
                console.error("Invalid URL:", url);
                return {
                    id: url,
                    source_name: "Unknown Author",
                    title: "No Title",
                    date: new Date().toDateString(),
                    news_url: url,
                    image_url: "https://placehold.jp/256x256.png",
                    text: "Failed to load content"
                };
            }
    
            const apiKey = '4f78f18fc17c41fca6fd4a86955b11b4';
            console.log(url);
            const response = await fetch(`https://newsapi.org/v2/everything?q=${stockSymbol}&apiKey=${apiKey}&sortBy=publishedAt&language=en`);
            console.log(stockSymbol)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const articleData = await response.json();

            const validArticles = articleData.articles.filter(article => 
                article.url && article.source.name && article.title && article.publishedAt && article.description && article.urlToImage
            );
            console.log("HERE ARE VALIDS");
            console.log(validArticles);
    
            if (validArticles.length === 0) {
                throw new Error('No valid articles found');
            }
            else {
                const randomIndex = Math.floor(Math.random() * validArticles.length);
                const article = validArticles[randomIndex];
                console.log(article.title);
                console.log("HERE ARE THE ARTICLES", articles);
                if (!article) {
                    throw new Error('No articles found');
                }
                console.log(articleData); // Log the response to see its structure
                return {
                    id: url,
                    source_name: article.source.name || "Unknown Source",
                    title: article.title || "No Title",
                    date: article.publishedAt || new Date().toDateString(),
                    news_url: article.url || url,
                    image_url: article.urlToImage || "https://placehold.jp/256x256.png",
                    text: article.description || "No Content"
                };
            }
        } catch (error) {
            console.error("Error fetching article details:", error);
            return {
                id: url,
                source_name: "Unknown Author",
                title: "No Title",
                date: new Date().toDateString(),
                news_url: url,
                image_url: "https://placehold.jp/256x256.png",
                text: "Failed to load content"
            };
        }
    };
    

    return (
        <div className="mb-5">
            <div className='rounded-lg bg-gray-100 mt-5 pt-4 pb-5 mx-6' style={{boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )', backgroundColor: 'rgb(243, 244, 246, 0.9)'}}>
                <h3 className='text-4xl italic font-bold'>Today's News for {stockSymbol}</h3>
            </div>

            <div className="mt-5 mb-3 mx-6">
                <input 
                    type="text" 
                    placeholder="Enter stock symbol" 
                    value={stockSymbol}
                    onChange={(e) => setStockSymbol(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="article-list">
                {articles.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    articles.map((article) => (
                        <FeedArticle
                            key={article.id}
                            author={article.source_name}
                            title={article.title}
                            ticker={stockSymbol} // "N/A"
                            date={new Date(article.date).toLocaleDateString()}
                            link={article.news_url}
                            image={article.image_url}
                            blurb={(article.text && article.text.substring(0, 200)) || "No Content"}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default Newsfeed;


// import React, { useEffect, useState } from 'react';
// import FeedArticle from '../components/FeedArticle';

// function Newsfeed() {
//     const [articles, setArticles] = useState([]);
//     const [stockSymbol, setStockSymbol] = useState('AAPL');

//     useEffect(() => {
//         fetch(`http://127.0.0.1:5000/stock/${stockSymbol}`)
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log("Fetched data:", data);

//                 if (data.choices && data.choices.length > 0) {
//                     const content = data.choices[0].message.content;
//                     console.log("Raw content:", content);

//                     // Extract URLs based on known patterns or content structure
//                     const links = extractLinksFromContent(content);
//                     console.log("Extracted links:", links);

//                     const uniqueLinks = [...new Set(links)].slice(0, 3);
//                     console.log("Unique links:", uniqueLinks);


//                     // Fetch additional details for each link
//                     Promise.all(links.map(link => fetchArticleDetails(link)))
//                         .then(fetchedArticles => {
//                             setArticles(fetchedArticles);
//                         })
//                         .catch(error => {
//                             console.error("Error fetching article details: ", error);
//                             setArticles([]);
//                         });
//                 } else {
//                     console.error("Unexpected data format:", data);
//                     setArticles([]);
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error fetching articles: ", error);
//                 setArticles([]);
//             });
//     }, [stockSymbol]);

//     const extractLinksFromContent = (content) => {
//         // Adjust this function to match the actual format of the content
//         // For example, you might look for specific patterns or keywords
//         // Here's a basic example:
//         const linkPatterns = [
//             /https:\/\/[^\s]+/g, // Adjust as needed based on the content
//             /www\.[^\s]+/g
//         ];
//         let links = [];
//         linkPatterns.forEach(pattern => {
//             const matches = content.match(pattern);
//             if (matches) {
//                 links = links.concat(matches);
//             }
//         });
//         return links;
//     };

//     const fetchArticleDetails = async (url) => {
//         try {
//             const response = await fetch(`https://api.example.com/article?url=${encodeURIComponent(url)}`);
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             const articleData = await response.json();
//             return {
//                 id: url,
//                 source_name: articleData.author || "Unknown Author",
//                 title: articleData.title || "No Title",
//                 date: articleData.date || new Date().toDateString(),
//                 news_url: url,
//                 image_url: articleData.image || "https://placehold.jp/256x256.png",
//                 text: articleData.text || "No Content"
//             };
//         } catch (error) {
//             console.error("Error fetching article details:", error);
//             return {
//                 id: url,
//                 source_name: "Unknown Author",
//                 title: "No Title",
//                 date: new Date().toDateString(),
//                 news_url: url,
//                 image_url: "https://placehold.jp/256x256.png",
//                 text: "Failed to load content"
//             };
//         }
//     };

//     return (
//         <div className="mb-5">
//             <div className='rounded-lg bg-gray-100 mt-5 pt-4 pb-5 mx-6' style={{boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )', backgroundColor: 'rgb(243, 244, 246, 0.9)'}}>
//                 <h3 className='text-4xl italic font-bold'>Today's News for {stockSymbol}</h3>
//             </div>

//             <div className="mt-5 mb-3 mx-6">
//                 <input 
//                     type="text" 
//                     placeholder="Enter stock symbol" 
//                     value={stockSymbol}
//                     onChange={(e) => setStockSymbol(e.target.value)}
//                     className="p-2 border border-gray-300 rounded-md"
//                 />
//             </div>

//             <div className="article-list">
//                 {articles.length === 0 ? (
//                     <p>Loading...</p>
//                 ) : (
//                     articles.map((article) => (
//                         <FeedArticle
//                             key={article.id}
//                             author={article.source_name}
//                             title={article.title}
//                             ticker="N/A"
//                             date={new Date(article.date).toLocaleDateString()}
//                             link={article.news_url}
//                             image={article.image_url}
//                             blurb={(article.text && article.text.substring(0, 200)) || "No Content"}
//                         />
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Newsfeed;
