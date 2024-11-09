import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { StockService } from '../../services/stock.service';
import { AccountService } from '../../services/account.service';
import { StockModel } from '../../models/stock.model';

@Component({
  selector: 'app-stock-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  template: `
    <table mat-table [dataSource]="stocks$ | async" class="mat-elevation-z8">
      <ng-container matColumnDef="symbol">
        <th mat-header-cell *matHeaderCellDef>Symbol</th>
        <td mat-cell *matCellDef="let stock">{{stock.symbol}}</td>
      </ng-container>

      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let stock">{{stock.name}}</td>
      </ng-container>

      <ng-container matColumnDef="price">
        <th mat-header-cell *matHeaderCellDef>Price</th>
        <td mat-cell *matCellDef="let stock">{{stock.price | currency}}</td>
      </ng-container>

      <ng-container matColumnDef="priceChange">
        <th mat-header-cell *matHeaderCellDef>Change</th>
        <td mat-cell *matCellDef="let stock" [class.positive]="stock.priceChange > 0" [class.negative]="stock.priceChange < 0">
          {{stock.priceChange | number:'1.2-2'}}%
        </td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let stock">
          <button mat-raised-button color="primary" (click)="buyStock(stock)">Buy</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: [`
    table {
      width: 100%;
    }
    .positive { color: green; }
    .negative { color: red; }
  `]
})
export class StockTableComponent {
  stocks$ = this.stockService.getStocks();
  displayedColumns = ['symbol', 'name', 'price', 'priceChange', 'actions'];

  constructor(
    private stockService: StockService,
    private accountService: AccountService
  ) {}

  buyStock(stock: StockModel): void {
    this.accountService.buyStock(stock, 1);
  }
}