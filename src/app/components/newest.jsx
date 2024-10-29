'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

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
    
    if (loading) return <p className='text-center'>loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className=''>
            <h1 className='font-bold text-center text-3xl mb-4'>Latest News</h1>
            <ul>
                {newsData.slice(0, 1).map((news, index) => (
                    <li key={index} className="mb-4 h-full w-1/2 mx-auto border border-gray-400 p-4">
                        <div className='flex flex-row'>
                            <div>
                                <h2 className="text-xl font-semibold mb-4">{news.title}</h2>
                                <p className="text-gray-600">{new Date(news.pubDate).toLocaleString()}</p>
                                <p className="text-gray-800">{news.description}</p>
                            </div>
                        <div>
                                <a href={news.link} target="_blank" rel="noopener noreferrer">
                                    <div className='relative max-w-6xl overflow-hidden bg-cover bg-no-repeat'>
                                        <Image width={800} height={400} src={news.thumbnail} alt={news.title} className=" object-cover mb-2  transition duration-300 ease-in-out hover:scale-105" />
                                    </div>
                                </a>
                        </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Newest