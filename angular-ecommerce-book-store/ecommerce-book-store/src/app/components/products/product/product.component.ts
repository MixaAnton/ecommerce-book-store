import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faCartShopping,faEye,faPen } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../../common/product';
import { CartItem } from '../../../common/cart-item';
import { CartService } from '../../../services/cart.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  imageToShow:any;
  src = "../../../../assets/images/about-us.jpg";

  constructor(private router:Router,private cartService:CartService,private sanitizer: DomSanitizer){
  }
  ngOnInit(){
      this.imageToShow = this.product.image? `data:image/jpeg;base64,${atob(this.product.image)}` : this.src;
  }
 
  goToEdit(){
    this.router.navigate(['/product-edit/'+this.product.id]);
  }

  addToCart(){

    const cartItem = new CartItem(this.product);

    this.cartService.addToCart(cartItem);
  }

}
