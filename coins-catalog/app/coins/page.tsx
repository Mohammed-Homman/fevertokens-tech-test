'use client';

import React from 'react';
import CoinsTable from './coinsTable';
import Link from 'next/link';
import { FaCoins } from 'react-icons/fa'; 
import { FaClock } from 'react-icons/fa6';

export default function Page() {
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Coins Catalog</h1>
        <CoinsTable />
      </div>
    </main>
  
    <footer className="bg-white fixed bottom-0 w-full border-t border-gray-200 text-gray-500 text-center py-4">
      <p>&copy; {new Date().getFullYear()} Crypto Catalog. All rights reserved.</p>
    </footer>
  </div>
  );
}  
