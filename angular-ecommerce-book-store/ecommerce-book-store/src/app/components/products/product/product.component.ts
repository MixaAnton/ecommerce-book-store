import { Component } from '@angular/core';
import { faCartShopping,faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  faCart= faCartShopping;
  faEye = faEye;
}
