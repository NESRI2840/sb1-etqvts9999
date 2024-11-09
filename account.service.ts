import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StockModel, InvestmentModel } from '../models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private cashBalance = new BehaviorSubject<number>(10000);
  private investments = new BehaviorSubject<InvestmentModel[]>([]);

  getCashBalance(): Observable<number> {
    return this.cashBalance.asObservable();
  }

  getInvestments(): Observable<InvestmentModel[]> {
    return this.investments.asObservable();
  }

  buyStock(stock: StockModel, quantity: number): boolean {
    const totalCost = stock.price * quantity;
    if (totalCost > this.cashBalance.value) {
      return false;
    }

    const currentInvestments = this.investments.value;
    const existingInvestment = currentInvestments.find(inv => inv.stock.symbol === stock.symbol);

    if (existingInvestment) {
      existingInvestment.quantity += quantity;
      existingInvestment.purchasePrice = 
        (existingInvestment.purchasePrice * existingInvestment.quantity + totalCost) / 
        (existingInvestment.quantity + quantity);
    } else {
      currentInvestments.push({
        stock,
        quantity,
        purchasePrice: stock.price
      });
    }

    this.cashBalance.next(this.cashBalance.value - totalCost);
    this.investments.next([...currentInvestments]);
    return true;
  }

  sellStock(investment: InvestmentModel, quantity: number): boolean {
    if (quantity > investment.quantity) {
      return false;
    }

    const currentInvestments = this.investments.value;
    const index = currentInvestments.findIndex(inv => inv.stock.symbol === investment.stock.symbol);

    if (index === -1) {
      return false;
    }

    const totalValue = investment.stock.price * quantity;
    this.cashBalance.next(this.cashBalance.value + totalValue);

    if (quantity === investment.quantity) {
      currentInvestments.splice(index, 1);
    } else {
      currentInvestments[index].quantity -= quantity;
    }

    this.investments.next([...currentInvestments]);
    return true;
  }
}