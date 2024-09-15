import React from 'react';
import './ArticleChip.css';
import { FaExternalLinkAlt } from 'react-icons/fa';

const ArticleChip = ({ imageUrl, summary, link }) => {
  return (
    <div 
      className="article-chip"
      onClick={() => window.open(link, '_blank')}
    >
      <img src={imageUrl} alt="Article thumbnail" className="article-image" />
      <div className="article-content">
        <p className="article-summary">{summary}</p>
      </div>
      <FaExternalLinkAlt className="link-icon" />
    </div>
  );
};

export default ArticleChip;

