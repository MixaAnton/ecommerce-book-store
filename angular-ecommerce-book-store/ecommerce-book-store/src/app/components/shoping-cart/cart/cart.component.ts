import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../common/cart-item';
import { faMinus, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems: CartItem[] = [];
  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  faPlus = faPlus;
  faMinus = faMinus;
  faTimes = faTimes;
  shipping: number = 0;
  src="../../../../assets/images/about-us.jpg"
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {

    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data
        if(this.totalPrice>=100)
          this.shipping = 0
        else
          this.shipping = 10;
      }
    );

    this.cartService.totalQuantity.subscribe( 
      data => this.totalQuantity = data
    );

    this.cartService.computeCartTotals();
  }

  incrementQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
  }

  remove(cartItem: CartItem) {
    this.cartService.remove(cartItem);
  }

  convertImage(image:any,imageExtension:any)
  {
     return image?`data:image/${imageExtension};base64,${atob(image)}` : this.src;
  }
}
