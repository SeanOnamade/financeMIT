import React from 'react';
import FeedArticle from '../components/FeedArticle'

function Newsfeed() {
    return (
    <div className="mb-5">
        <div className='rounded-lg bg-gray-100 mt-5 pt-4 pb-5 mx-6' style={{boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )'}}>
            <h3 className='text-4xl italic font-bold'>Today's News</h3>
        </div>
        <FeedArticle />
    </div>
    )
}

export default Newsfeed;