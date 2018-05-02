import {Component, Input, OnInit} from '@angular/core';
import {StockMarketModel} from "../stock-market.model";
import {StocksPageComponent} from "../stocks-page/stocks-page.component";
import {CompanyModel} from "../company.model";
import {StockMarketService} from "../stock-market.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css']
})
export class StockCardComponent implements OnInit {

  @Input() company: CompanyModel;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  getCompany(): CompanyModel {
    return this.company;
  }

  getCompanyStock() {
    return this.company.getStock();
  }

  favoriteStock(company: CompanyModel) {
    this.authService.addStockToFave(company);
  }

  isPositive() {
    if (!this.getCompanyStock().isLoaded()) {
      return false;
    }
    return this.getCompanyStock().quote.changePercent > 0.0;
  }
  isNegative() {
    if (!this.getCompanyStock().isLoaded()) {
      return false;
    }
    return this.getCompanyStock().quote.changePercent < 0.0;
  }
  isNeutral() {
    if (!this.getCompanyStock().isLoaded()) {
      return false;
    }
    return this.getCompanyStock().quote.changePercent == 0.0;
  }
}