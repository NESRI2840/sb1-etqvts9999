import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockTableComponent } from './components/stock-table/stock-table.component';
import { InvestmentTableComponent } from './components/investment-table/investment-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StockTableComponent, InvestmentTableComponent],
  template: `
    <div class="container">
      <h1>Stock Trading Dashboard</h1>
      <div class="tables-container">
        <div class="table-section">
          <h2>Available Stocks</h2>
          <app-stock-table></app-stock-table>
        </div>
        <div class="table-section">
          <h2>Your Investments</h2>
          <app-investment-table></app-investment-table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tables-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 20px;
    }
    .table-section {
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 { text-align: center; }
  `]
})
export class App {
  title = 'Stock Trading App';
}