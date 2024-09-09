import { Component } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent {

  faShoppingCart = faShoppingCart;
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

  }
}
