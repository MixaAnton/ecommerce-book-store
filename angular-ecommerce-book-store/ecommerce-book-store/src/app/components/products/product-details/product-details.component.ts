import { Component } from '@angular/core';
import { faCartShopping,faPlus,faMinus } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../../common/product';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../../common/cart-item';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  faCart = faCartShopping;
  faPlus = faPlus;
  faMinus = faMinus;
  cartItem!:CartItem;
  product!: Product;
  quantity:number = 1;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService:CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {

    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
        this.cartItem = new CartItem(this.product)
      }
    )
  }

  incrementQuantity() {
    if(this.quantity<this.product.unitsInStock)
    this.quantity++;
  }

  decrementQuantity() {
    if(this.quantity>2)
      this.quantity--;
  }

  addToCart() {
    this.cartService.addToCart(this.cartItem,this.quantity);
  }
}
