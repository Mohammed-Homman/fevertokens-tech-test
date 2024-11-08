'use client';

import React, { useState } from 'react';
import { useCoinsData } from '../api';
import { useRouter } from 'next/navigation';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import Image from 'next/image';
import { CoinTableData } from '@/context/coinType';
import {  FaSearch,FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { FaRegStar, FaStar } from 'react-icons/fa'; 
import BitcoinSpinner from '../../components/coinSpinner';
import { RiDropdownList } from 'react-icons/ri';

const CoinsTable = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const router = useRouter();
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ByName');

  const { data, error, isLoading } = useCoinsData({
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: perPage,
    page: page,
    sparkline: true,
    price_change_percentage: '1h,24h,7d'
  });

  const handleFavoriteToggle = (coinId: string) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [coinId]: !prevFavorites[coinId]
    }));
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = Array.isArray(data)
  ? data.filter((coin: CoinTableData) => {
      const term = searchTerm.toLowerCase();
      switch (filterType) {
        case 'ByID':
          return coin.id.toLowerCase().includes(term);
        case 'ByCode':
          return coin.symbol.toLowerCase().includes(term);
        case 'ByName':
          return coin.name.toLowerCase().includes(term);
        default:
          return true;
      }
    })
  : []; 


  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
    setPage(1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (data && data.length === perPage) setPage(page + 1);
  };

  const handleRowClick = (coinId: string) => {
    router.push(`/coins/${coinId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BitcoinSpinner />
      </div>
    );
  }
  if (error) return <p>Error loading data</p>;

  const handleFilterTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Coins</h1>

      
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="relative flex items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search for a coin"
            value={searchTerm}
            onChange={handleSearch}
            className="border rounded-full px-4 py-2 pr-10 text-sm w-full sm:w-64 focus:outline-none focus:ring focus:border-yellow-500"
          />
          <FaSearch className="absolute right-3 text-gray-400" />
        </div>
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <RiDropdownList className="text-gray-600 hover:text-yellow-500 p-2 rounded-lg" aria-label="Filter" />
          <select 
            value={filterType} 
            onChange={handleFilterTypeChange} 
            className="p-2 border rounded-lg text-gray-600"
          >
            <option value="ByID">By ID</option>
            <option value="ByCode">By Code</option>
            <option value="ByName">By Name</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-2 py-2 border">#</th>
              <th className="px-2 py-2 border">Coin</th>
              <th className="px-2 py-2 border">Price</th>
              <th className="px-2 py-2 border">1h</th>
              <th className="px-2 py-2 border">24h</th>
              <th className="px-2 py-2 border">7d</th>
              <th className="px-2 py-2 border">24h Volume</th>
              <th className="px-2 py-2 border">Market Cap</th>
              <th className="px-2 py-2 border">Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((coin: CoinTableData, index: number) => (
              <tr key={coin.id} className="cursor-pointer hover:bg-gray-100" onClick={() => handleRowClick(coin.id)}>
                <td className="px-2 py-2 border text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavoriteToggle(coin.id);
                    }}
                    className="text-gray-500 mr-2 hover:text-yellow-500 transition-colors"
                  >
                    {favorites[coin.id] ? <FaStar /> : <FaRegStar />}
                  </button>
                  <span>{index + 1 + (page - 1) * perPage}</span>
                </td>
                <td className="px-2 py-2 border">
                  <div className="flex items-center">
                    <Image src={coin.image} alt={coin.name} width={20} height={20} className="w-6 h-6 mr-2" />
                    <span className="font-bold">{coin.name}</span>
                    <span className="ml-2 text-xs sm:text-sm text-gray-500">{coin.symbol.toUpperCase()}</span>
                  </div>
                </td>
                <td className="px-2 py-2 border">${coin.current_price.toLocaleString()}</td>
                
                <td className="px-4 py-2 border" style={{ color: coin.price_change_percentage_1h_in_currency > 0 ? 'green' : 'red' }}>
                {coin.price_change_percentage_1h_in_currency > 0 ? <FaArrowUp /> : <FaArrowDown />}
                {Math.abs(coin.price_change_percentage_1h_in_currency).toFixed(2)}%
              </td>
              <td className="px-4 py-2 border" style={{ color: coin.price_change_percentage_24h_in_currency > 0 ? 'green' : 'red' }}>
                {coin.price_change_percentage_24h_in_currency > 0 ? <FaArrowUp /> : <FaArrowDown />}
                {Math.abs(coin.price_change_percentage_24h_in_currency).toFixed(2)}%
              </td>
              <td className="px-4 py-2 border" style={{ color: coin.price_change_percentage_7d_in_currency > 0 ? 'green' : 'red' }}>
                {coin.price_change_percentage_7d_in_currency > 0 ? <FaArrowUp /> : <FaArrowDown />}
                {Math.abs(coin.price_change_percentage_7d_in_currency).toFixed(2)}%
              </td>
              
                <td className="px-2 py-2 border">${coin.total_volume.toLocaleString()}</td>
                <td className="px-2 py-2 border">${coin.market_cap.toLocaleString()}</td>
                <td className="px-2 py-2 border">
                  {coin.sparkline_in_7d && (
                    <Sparklines data={coin.sparkline_in_7d.price} width={80} height={20}>
                      <SparklinesLine color={coin.sparkline_in_7d.price[0] < coin.sparkline_in_7d.price[coin.sparkline_in_7d.price.length - 1] ? 'green' : 'red'} />
                    </Sparklines>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 space-y-2 sm:space-y-0">
  <select 
    value={perPage} 
    onChange={handlePerPageChange} 
    className="p-2 border rounded-lg text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
  >
    <option value={10}>10 per page</option>
    <option value={50}>50 per page</option>
    <option value={100}>100 per page</option>
  </select>

  <div className="flex space-x-2">
    <button
      onClick={() => setPage(1)}
      disabled={page === 1}
      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
        page === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-yellow-400 text-white hover:bg-yellow-500'
      } shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300`}
    >
      First
    </button>
    <button
      onClick={handlePrevious}
      disabled={page === 1}
      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
        page === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-yellow-400 text-white hover:bg-yellow-500'
      } shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300`}
    >
      Previous
    </button>
    <span className="px-4 font-semibold text-gray-700">
      Page {page}
    </span>
    <button
      onClick={handleNext}
      disabled={data && data.length < perPage}
      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
        data && data.length < perPage ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-yellow-400 text-white hover:bg-yellow-500'
      } shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300`}
    >
      Next
    </button>
    <button
      onClick={() => data && setPage(Math.ceil(data.length / perPage))}
      disabled={!data || data.length < perPage}
      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
        !data || data.length < perPage ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-yellow-400 text-white hover:bg-yellow-500'
      } shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300`}
    >
      Last
    </button>
  </div>
    </div>
    </div>
  );
};

export default CoinsTable;
