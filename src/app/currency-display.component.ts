import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from './exchange-rate.service';

@Component({
  selector: 'app-currency-display',
  templateUrl: './currency-display.component.html'
})
export class CurrencyDisplayComponent implements OnInit {
  mxnPrice: number = 100; // Precio base en MXN
  usdPrice: number | null = null;
  eurPrice: number | null = null;

  constructor(private exchangeService: ExchangeRateService) {}

  ngOnInit(): void {
    this.exchangeService.getExchangeRates().subscribe(data => {
      const rates = data.conversion_rates;
      this.usdPrice = this.mxnPrice * rates.USD;
      this.eurPrice = this.mxnPrice * rates.EUR;
    });
  }
}
