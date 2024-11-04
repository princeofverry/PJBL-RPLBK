'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react';

const Newest = () => {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    "https://api-berita-indonesia.vercel.app/cnn/teknologi/"
                );
                setNewsData(response.data.data.posts);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch news');
                setLoading(false);
            }
        };
        fetchNews();
    }, []);
    
    if (loading) return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
    if (error) return <p className="text-red-600 p-4">{error}</p>;

    return (
        <div className='max-w-6xl mx-auto px-4'>
            <h1 className='font-bold text-center text-3xl mb-8'>Latest News</h1>
            <div className="grid gap-8">
                {newsData.slice(0, 1).map((news, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className='grid md:grid-cols-2 gap-6 p-6'>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">{news.title}</h2>
                                <p className="text-gray-600 text-sm">{new Date(news.pubDate).toLocaleString()}</p>
                                <p className="text-gray-800">{news.description}</p>
                                <a 
                                  href={news.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                  Read More
                                </a>
                            </div>
                            <div className="relative h-[300px]">
                                <a href={news.link} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        fill
                                        src={news.thumbnail}
                                        alt={news.title}
                                        className="object-cover rounded-lg transition duration-300 ease-in-out hover:scale-105"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Newest;