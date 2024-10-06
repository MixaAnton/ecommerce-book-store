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
  isDisabled = false;
  @Input()
  isUser!:boolean;
  @Input()
  isAdminOrManager!:boolean;

  constructor(private router:Router,private cartService:CartService,private sanitizer: DomSanitizer){
  }
  ngOnInit(){
      this.imageToShow = this.product.image? `data:image/${this.product.imageExtension};base64,${atob(this.product.image)}` : this.src;
  }
 
  goToEdit(){
    this.router.navigate(['/product-edit/'+this.product.id]);
  }

  addToCart(){

    const cartItem = new CartItem(this.product);
    let existingItem = this.cartService.cartItems.find(item => item.id === cartItem.id);

    let quantityToAdd = existingItem ? existingItem.quantity + 1 : 1;
    if (quantityToAdd <= this.product.unitsInStock) {
      this.cartService.addToCart(cartItem, 1);
      this.checkCartStock();
    }
  }

  checkCartStock() {
    const existingItem = this.cartService.cartItems.find(item => item.id === this.product.id);
    const cartQuantity = existingItem ? existingItem.quantity : 0;

    this.isDisabled = cartQuantity >= this.product.unitsInStock;
  }

}
