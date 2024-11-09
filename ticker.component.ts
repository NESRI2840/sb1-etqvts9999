import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-ticker',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="ticker-container">
      <div class="ticker-wrap">
        <div class="ticker">
          <ng-container *ngFor="let stock of stocks$ | async">
            <div class="ticker-item">
              <span class="symbol">{{stock.symbol}}</span>
              <span [class]="stock.priceChange >= 0 ? 'price-up' : 'price-down'">
                {{stock.price | currency}} ({{stock.priceChange | number:'1.2-2'}}%)
              </span>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ticker-container {
      width: 100%;
      background: #1a237e;
      padding: 10px 0;
      overflow: hidden;
    }
    .ticker-wrap {
      width: 100%;
      overflow: hidden;
    }
    .ticker {
      display: flex;
      animation: ticker 30s linear infinite;
      white-space: nowrap;
    }
    .ticker-item {
      margin: 0 30px;
      color: white;
    }
    .symbol {
      font-weight: bold;
      margin-right: 10px;
    }
    .price-up {
      color: #69f0ae;
    }
    .price-down {
      color: #ff5252;
    }
    @keyframes ticker {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
  `]
})
export class TickerComponent {
  stocks$ = this.stockService.getStocks();

  constructor(private stockService: StockService) {}
}