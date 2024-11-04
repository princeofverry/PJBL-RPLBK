'use client'

import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const API_KEY = '99f4b648a0be8261d77eb00e20e49d68';
const API_URL = `https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY}&base=USD&currencies=EUR,XAU,XAG`;

const GoldPrice = () => {
  const [goldData, setGoldData] = useState({
    price: null,
    change24h: 0,
    lastUpdated: null,
    rates: {
      EUR: 0,
      XAG: 0,
      XAU: 0
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoldPrice = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data.success) {
          setGoldData({
            price: data.rates.USDXAU,
            rates: data.rates,
            lastUpdated: new Date(data.timestamp * 1000).toLocaleString(),
            change24h: 0 // Note: Would need historical data endpoint for this
          });
        } else {
          setError('Failed to fetch gold price data');
        }
      } catch (err) {
        setError('Error connecting to the server');
      } finally {
        setLoading(false);
      }
    };

    fetchGoldPrice();
    const interval = setInterval(fetchGoldPrice, 60000); // Refresh every minute

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
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Live Gold Price
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex gap-6">
            {/* Main Price Card */}
            <div className="flex-1 p-6 rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-600">Gold Price (XAU/USD)</h3>
                  <p className="text-3xl font-bold text-yellow-600">
                    ${(1 / goldData.rates.XAU).toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${goldData.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {goldData.change24h >= 0 ? '↑' : '↓'} {Math.abs(goldData.change24h)}%
                  </p>
                  <p className="text-xs text-gray-500">24h change</p>
                </div>
              </div>
              {goldData.lastUpdated && (
                <p className="text-sm text-gray-500">
                  Last updated: {goldData.lastUpdated}
                </p>
              )}
            </div>

            {/* Exchange Rates */}
            <div className="flex gap-4 flex-1">
              <div className="flex-1 p-4 rounded-lg bg-white border border-gray-200">
                <h4 className="text-sm font-medium text-gray-500">EUR/USD</h4>
                <p className="text-lg font-semibold text-gray-900">
                  €{goldData.rates.EUR?.toFixed(4)}
                </p>
              </div>
              <div className="flex-1 p-4 rounded-lg bg-white border border-gray-200">
                <h4 className="text-sm font-medium text-gray-500">Silver (XAG/USD)</h4>
                <p className="text-lg font-semibold text-gray-900">
                  ${(1 / goldData.rates.XAG).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Price per gram */}
            <div className="flex-1 p-4 rounded-lg bg-gray-50 border border-gray-200">
              <h4 className="text-sm font-medium text-gray-500">Gold per gram</h4>
              <p className="text-lg font-semibold text-gray-900">
                ${((1 / goldData.rates.XAU) / 31.1035).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">
                1 troy ounce = 31.1035 grams
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldPrice;