import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faCartShopping,faEye,faPen } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../../common/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  faCart= faCartShopping;
  faEye = faEye;
  faPen = faPen;
  @Input()
  product!:Product;
 

  constructor(private router:Router){
  }
 
  goToEdit(){
    this.router.navigate(['/product-edit/'+this.product.id]);
  }

  addToCart(){
    
  }
}
