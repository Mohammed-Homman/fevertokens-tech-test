'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { CoinDetailData } from '@/context/coinType';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CoinSpinner from '../../../components/coinSpinner';
import { FaArrowDown, FaArrowUp, FaCoins } from 'react-icons/fa';
import Link from 'next/link';
import { FaClock } from 'react-icons/fa6';

export default function CoinDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [coin, setCoin] = useState<CoinDetailData | null>(null);
  const [isloading, setLoading] = useState(true);
  const [coinId, setCoinId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchParams = async () => {
      const { id } = await params;
      setCoinId(id);      
    };
    fetchParams();
  }, [params]);

  useEffect(() => {
    const fetchCoinData = async () => {
      if (!coinId) return;

      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}`);
        setCoin(response.data[0]); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinId]);

  if (isloading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CoinSpinner />
      </div>
    );
  }
  if (!coin) return <p>Error: Coin not found</p>;
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white fixed top-0 w-full shadow-sm py-3 border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="#" className="flex items-center space-x-2 text-gray-800 text-xl font-semibold">
          <FaCoins className="text-yellow-500" /> 
          <span>CryptoCatalog</span> 
        </Link>
        <div className="flex items-center space-x-2 text-gray-800 bg-gray-200 px-3 py-1 rounded-full">
          <FaClock className="text-yellow-500" /> 
          <span className="font-medium text-lg">
            {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </header>
    <main className="container mx-auto mt-10 mb-10 py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Coin Details</h1>
    <div className="w-full p-4 max-w-full">
      <div className="flex-row mb-4 items-center">
        <div>
          
        </div>
        <motion.div
          className="badge text-blue-500 bg-blue-100"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        >
          Rank #{coin.market_cap_rank}
        </motion.div>
        <Image src={coin.image} alt={coin.name} width={32} height={32} className="w-8 h-8 ml-2" />
        <h1 className="text-3xl font-bold">
          {coin.name} <span className="text-gray-500">{coin.symbol.toUpperCase()}</span>
        </h1>
      </div>
      <div className="flex items-center text-4xl font-bold">
        ${coin.current_price.toLocaleString()}
        <span className={`ml-2 text-2xl ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {coin.price_change_percentage_24h > 0 ? <FaArrowUp /> : <FaArrowDown />}{coin.price_change_percentage_24h.toFixed(2)}%
        </span>
      </div>
      <div className="text-gray-500 text-sm mt-1">
        1.00000000 {coin.symbol.toUpperCase()} ≈ ${coin.current_price.toLocaleString()} USD
      </div>
      <div className="flex mt-6 space-x-4">
        <button className="btn btn-primary">Add to Watchlist</button>
        <button className="btn btn-primary">Share</button>
        <button className="btn btn-primary">More</button>
      </div>
      <div className="range-bar-container">
        <div className="range-labels">
          <span>${coin.low_24h.toLocaleString()}</span>
          <span>24H Range</span>
          <span>${coin.high_24h.toLocaleString()}</span>
        </div>
        <div
          className="range-bar"
          style={{
            width: `${((coin.current_price - coin.low_24h) / (coin.high_24h - coin.low_24h)) * 100}%`,
            background: 'linear-gradient(to right, #facc15, #10b981)',
          }} >
        </div>
      </div>
      <div className="coin-details grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="coin-detail-item">
          <p className="coin-detail-title">Market Cap</p>
          <p className="coin-detail-value">${coin.market_cap.toLocaleString()}</p>
        </div>
        <div className="coin-detail-item">
          <p className="coin-detail-title">Circulating Supply</p>
          <p className="coin-detail-value">{coin.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}</p>
        </div>
        <div className="coin-detail-item">
          <p className="coin-detail-title">24 Hour Trading Vol</p>
          <p className="coin-detail-value">${coin.total_volume.toLocaleString()}</p>
        </div>
        <div className="coin-detail-item">
          <p className="coin-detail-title">Total Supply</p>
          <p className="coin-detail-value">{coin.total_supply?.toLocaleString() || 'N/A'}</p>
        </div>
        <div className="coin-detail-item">
          <p className="coin-detail-title">Fully Diluted Valuation</p>
          <p className="coin-detail-value">${coin.fully_diluted_valuation?.toLocaleString() || 'N/A'}</p>
        </div>
        <div className="coin-detail-item">
          <p className="coin-detail-title">Max Supply</p>
          <p className="coin-detail-value">{coin.max_supply?.toLocaleString() || 'N/A'}</p>
        </div>
      </div>
      <button onClick={() => router.back()} className="btn-back mt-6">Back to Coins List</button>
    </div>
    </div>
    </main>
    <footer className="bg-white fixed bottom-0 w-full border-t border-gray-200 text-gray-500 text-center py-4">
      <p>&copy; {new Date().getFullYear()} Crypto Catalog. All rights reserved.</p>
    </footer>
    </div>
  );
  
}
