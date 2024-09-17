import { Component, EventEmitter, input, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-price-filter',
  templateUrl: './product-price-filter.component.html',
  styleUrl: './product-price-filter.component.css'
})
export class ProductPriceFilterComponent {

  @Input()
  startPrice: number = 0;
  @Input()
  endPrice: number = 0;
  isInputFilled = false;
  minValue = 0;

  @Output()
  prices:EventEmitter<Array<number>> = new EventEmitter<Array<number>>

  onInputChange() {
    this.isInputFilled = !!(this.startPrice || this.endPrice);
  }

  clearInput() {
    this.startPrice = 0;
    this.endPrice = 0;
    this.isInputFilled = false;
    this.doPriceFilter();
  }

  doPriceFilter() {
    if(this.startPrice < 0)
      this.startPrice = 0;
    if(this.endPrice < 0)
      this.endPrice = 0;
    this.prices.emit([this.startPrice,this.endPrice])
  }
}
