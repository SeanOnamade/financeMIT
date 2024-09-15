import React, { useRef, useEffect, useState } from 'react';
import './ArticleChip.css';

const ArticleChip = ({ imageUrl, summary, link, isLoading }) => {
  const [truncatedSummary, setTruncatedSummary] = useState('');
  const summaryRef = useRef(null);

  useEffect(() => {
    const truncateText = () => {
      const element = summaryRef.current;
      if (element) {
        const maxHeight = parseFloat(getComputedStyle(element).lineHeight) * 3;
        let text = summary.replace(/\*\*/g, '').trim();
        element.innerText = text;
        
        while (element.offsetHeight > maxHeight && text.length > 0) {
          text = text.slice(0, -1);
          element.innerText = text + '...';
        }
        
        setTruncatedSummary(element.innerText);
      }
    };

    truncateText();
    window.addEventListener('resize', truncateText);
    return () => window.removeEventListener('resize', truncateText);
  }, [summary]);

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className={`article-chip ${isLoading ? 'loading' : ''}`}>
      <img src={imageUrl} alt="Article thumbnail" className="article-image" />
      <p ref={summaryRef} className="article-summary">{truncatedSummary}</p>
    </a>
  );
};

export default ArticleChip;

