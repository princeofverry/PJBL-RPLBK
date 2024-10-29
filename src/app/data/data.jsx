'use client'
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Data = ({api}) => {
const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchNews = async () => {
    try {
      const response = await axios.get(api);
      setNewsData(response.data.data.posts);
      setLoading(false);
    } catch (err) {
      console.error(err); // Log the error
      setError('Failed to fetch news');
      setLoading(false);
    }
  };
  fetchNews();
}, [api]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className='font-bold'>Technology News</h1>
      <ul>
        {newsData.slice(1, 11).map((news, index) => (
          <li key={index} className="mb-4">
            <a href={news.link} target="_blank" rel="noopener noreferrer">
              <Image width={400} height={400} src={news.thumbnail} alt={news.title} className="w-48 h-28 object-cover mb-2" />
              <h2 className="text-xl font-semibold">{news.title}</h2>
            </a>
            <p className="text-gray-600">{new Date(news.pubDate).toLocaleString()}</p>
                <p className="text-gray-800">{news.description}</p>
                <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Data