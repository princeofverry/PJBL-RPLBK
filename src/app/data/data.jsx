'use client'
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react';

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
        console.error(err);
        setError('Failed to fetch news');
        setLoading(false);
      }
    };
    fetchNews();
  }, [api]);

  if (loading) return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
    </div>
  );
  if (error) return <p className="text-red-600 p-4">{error}</p>;

  return (
    <div className="space-y-8">
      <div className="grid gap-8">
        {newsData.slice(1, 11).map((news, index) => (
          <div key={index} className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
            <a 
              href={news.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="grid md:grid-cols-3 gap-4 p-4"
            >
              <div className="relative h-48 md:h-full">
                <Image
                  fill
                  src={news.thumbnail}
                  alt={news.title}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <h2 className="text-xl font-semibold group-hover:text-red-600 transition-colors">
                  {news.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {new Date(news.pubDate).toLocaleString()}
                </p>
                <p className="text-gray-700 line-clamp-3">
                  {news.description}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Data;