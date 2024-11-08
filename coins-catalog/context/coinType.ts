export interface CoinTableData {
    id: string;
    image: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_1h_in_currency: number;
    price_change_percentage_24h_in_currency: number;
    price_change_percentage_7d_in_currency: number;
    total_volume: number;
    market_cap: number;
    sparkline_in_7d?: { price: number[] };
  }

export interface CoinDetailData {
  id: string;
  symbol: string;
  name: string;
  image:string;
  market_cap_rank: number;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_24h: number;
  high_24h: number;
  low_24h: number;
  market_cap: number;
  total_volume: number;
  fully_diluted_valuation: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
}


export interface TypeCoin {
  length: number;
  id: string;
  image: string ;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_24h_in_currency?: number;
  price_change_percentage_7d_in_currency?: number;
  total_volume: number;
  market_cap: number;
  sparkline_in_7d?: { price: number[] };
  market_cap_rank?: number;
  price_change_percentage_24h?: number;
  price_change_24h?: number;
  high_24h?: number;
  low_24h?: number;
  fully_diluted_valuation?: number;
  circulating_supply?: number;
  total_supply?: number;
  max_supply?: number;
}
