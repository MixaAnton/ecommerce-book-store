import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  storage: Storage = sessionStorage;

  constructor() { }

  // addToCart(theCartItem: CartItem) {

  //   let alreadyExistsInCart: boolean = false;
  //   let existingCartItem: CartItem | undefined = undefined;

  //   if (this.cartItems.length > 0) {
  
  //     existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === theCartItem.id );

  //     alreadyExistsInCart = (existingCartItem != undefined);
  //   }

  //   if (alreadyExistsInCart)  
  //     existingCartItem!.quantity++;
  //   else 
  //     this.cartItems.push(theCartItem);
    
  //   this.computeCartTotals();
  // }

  addToCart(theCartItem: CartItem, quantity: number = 1) {

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    // Proveri da li već postoji artikl u korpi
    if (this.cartItems.length > 0) {
  
      // Pronađi artikl po ID-u
      existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === theCartItem.id );

      // Ako artikl postoji, postavi indikator
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    // Ako artikl postoji u korpi, uvećaj njegovu količinu
    if (alreadyExistsInCart) {
      existingCartItem!.quantity += quantity;
    }
    // Ako artikl ne postoji, dodaj ga u korpu s postavljenom količinom
    else {
      theCartItem.quantity = quantity;  // postavi početnu količinu
      this.cartItems.push(theCartItem);
    }

    // Ažuriraj ukupan iznos u korpi
    this.computeCartTotals();
}

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    
    this.persistCartItems();
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  decrementQuantity(theCartItem: CartItem) {

    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {

    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id );

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }
}
