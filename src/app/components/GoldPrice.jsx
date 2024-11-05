'use client';

import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const API_URLS = {
  hargaemas: 'https://logam-mulia-api.vercel.app/prices/hargaemas-com',
  indogold: 'https://logam-mulia-api.vercel.app/prices/indogold',
};

const GoldPrice = () => {
  const [goldData, setGoldData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchGoldPrices = async () => {
      setLoading(true);
      try {
        const [hargaemasResponse, indogoldResponse] = await Promise.all([
          fetch(API_URLS.hargaemas),
          fetch(API_URLS.indogold),
        ]);

        const [hargaemasData, indogoldData] = await Promise.all([
          hargaemasResponse.json(),
          indogoldResponse.json(),
        ]);

        const combinedData = [
          ...hargaemasData.data.map(item => ({ ...item, source: 'hargaemas.com' })),
          ...indogoldData.data.map(item => ({ ...item, source: 'indogold.id' })),
        ];

        setGoldData(combinedData);
        setLastUpdated(new Date().toLocaleString());
      } catch (err) {
        setError('Error connecting to the server');
      } finally {
        setLoading(false);
      }
    };

    fetchGoldPrices();
    const interval = setInterval(fetchGoldPrices, 1800000); // Refresh every 30 minutes

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-8xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Live Gold Prices
          </h2>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-6">
            {goldData.map((item, index) => (
              <div key={index} className="flex-1 p-6 rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200">
                <h3 className="text-lg font-semibold text-gray-600">Gold Price ({item.type})</h3>
                <p className="text-3xl font-bold text-yellow-600">
                  Sell: Rp{item.sell.toLocaleString()}
                </p>
                <p className="text-xl font-semibold text-gray-600">
                  Buy: Rp{item.buy.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Source: <a href={`https://${item.source}`} className="text-blue-500" target="_blank" rel="noopener noreferrer">{item.source}</a>
                </p>
              </div>
            ))}
          </div>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoldPrice;
