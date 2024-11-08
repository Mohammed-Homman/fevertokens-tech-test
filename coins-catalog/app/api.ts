import axios from 'axios';
import useSWR, { SWRResponse } from 'swr';
import { TypeCoin } from '@/context/coinType';

const axiosInstance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3', 
  headers: {
    'Content-Type': 'application/json',
  },
});

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export function useCoinsData(
  params: { 
    vs_currency: string; 
    order: string; 
    per_page: number; 
    page: number;
    sparkline: boolean;
    price_change_percentage: string;
  }
): SWRResponse<TypeCoin, TypeCoin> {
  const query = new URLSearchParams({
    vs_currency: params.vs_currency,
    order: params.order,
    per_page: params.per_page.toString(),
    page: params.page.toString(),
    sparkline: params.sparkline.toString(),
    price_change_percentage: params.price_change_percentage,
  }).toString();
  
  return useSWR(`/coins/markets?${query}`, fetcher, {
    refreshInterval: 60000, 
    revalidateOnFocus: false,
  });
}

export { axiosInstance };
