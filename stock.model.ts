export interface StockModel {
  symbol: string;
  name: string;
  price: number;
  priceChange: number;
  volume: number;
}

export interface InvestmentModel {
  stock: StockModel;
  quantity: number;
  purchasePrice: number;
  currentValue?: number;
  return?: number;
}