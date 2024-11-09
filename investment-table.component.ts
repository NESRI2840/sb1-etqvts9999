import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AccountService } from '../../services/account.service';
import { InvestmentModel } from '../../models/stock.model';

@Component({
  selector: 'app-investment-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  template: `
    <div class="balance-container">
      <h3>Cash Balance: {{cashBalance$ | async | currency}}</h3>
    </div>
    <table mat-table [dataSource]="investments$ | async" class="mat-elevation-z8">
      <ng-container matColumnDef="symbol">
        <th mat-header-cell *matHeaderCellDef>Symbol</th>
        <td mat-cell *matCellDef="let investment">{{investment.stock.symbol}}</td>
      </ng-container>

      <ng-container matColumnDef="quantity">
        <th mat-header-cell *matHeaderCellDef>Quantity</th>
        <td mat-cell *matCellDef="let investment">{{investment.quantity}}</td>
      </ng-container>

      <ng-container matColumnDef="purchasePrice">
        <th mat-header-cell *matHeaderCellDef>Purchase Price</th>
        <td mat-cell *matCellDef="let investment">{{investment.purchasePrice | currency}}</td>
      </ng-container>

      <ng-container matColumnDef="currentPrice">
        <th mat-header-cell *matHeaderCellDef>Current Price</th>
        <td mat-cell *matCellDef="let investment">{{investment.stock.price | currency}}</td>
      </ng-container>

      <ng-container matColumnDef="return">
        <th mat-header-cell *matHeaderCellDef>Return</th>
        <td mat-cell *matCellDef="let investment" [class.positive]="getReturn(investment) > 0" [class.negative]="getReturn(investment) < 0">
          {{getReturn(investment) | number:'1.2-2'}}%
        </td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let investment">
          <button mat-raised-button color="warn" (click)="sellStock(investment)">Sell</button>
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
    .balance-container {
      margin: 20px 0;
    }
    .positive { color: green; }
    .negative { color: red; }
  `]
})
export class InvestmentTableComponent {
  investments$ = this.accountService.getInvestments();
  cashBalance$ = this.accountService.getCashBalance();
  displayedColumns = ['symbol', 'quantity', 'purchasePrice', 'currentPrice', 'return', 'actions'];

  constructor(private accountService: AccountService) {}

  getReturn(investment: InvestmentModel): number {
    return ((investment.stock.price - investment.purchasePrice) / investment.purchasePrice) * 100;
  }

  sellStock(investment: InvestmentModel): void {
    this.accountService.sellStock(investment, 1);
  }
}