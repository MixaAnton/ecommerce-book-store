import { Component } from '@angular/core';
import { faCartShopping,faPlus,faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  faCart = faCartShopping;
  faPlus = faPlus;
  faMinus = faMinus;

  constructor(){}

}
