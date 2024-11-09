import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { StockModel } from '../models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stocks: StockModel[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 150.0, priceChange: 2.5, volume: 1000000 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2800.0, priceChange: -1.2, volume: 500000 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 300.0, priceChange: 1.8, volume: 750000 }
  ];

  private stocksSubject = new BehaviorSubject<StockModel[]>(this.stocks);

  constructor() {
    this.simulatePriceChanges();
  }

  getStocks(): Observable<StockModel[]> {
    return this.stocksSubject.asObservable();
  }

  private simulatePriceChanges(): void {
    interval(5000).subscribe(() => {
      this.stocks = this.stocks.map(stock => ({
        ...stock,
        price: stock.price * (1 + (Math.random() - 0.5) * 0.02),
        priceChange: (Math.random() - 0.5) * 5
      }));
      this.stocksSubject.next(this.stocks);
    });
  }
}