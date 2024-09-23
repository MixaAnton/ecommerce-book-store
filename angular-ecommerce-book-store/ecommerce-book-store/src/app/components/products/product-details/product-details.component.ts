import { Component } from '@angular/core';
import { faCartShopping,faPlus,faMinus, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../../common/product';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../../common/cart-item';
import { CartService } from '../../../services/cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteComponent } from '../../delete/delete.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  faCart = faCartShopping;
  faPlus = faPlus;
  faTrash = faTrash;
  faMinus = faMinus;
  faPencile = faPencil;
  cartItem!:CartItem;
  product!: Product;
  quantity:number = 1;
  imageToShow:any;
  src = "../../../../assets/images/about-us.jpg";
  totalCartQuantity: number = 0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService:CartService,
              private modalService:NgbModal) { }

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
        this.imageToShow = this.product.image? `data:image/${this.product.imageExtension};base64,${atob(this.product.image)}` : this.src;
        this.cartItem = new CartItem(this.product)
        this.getTotalCartQuantity();
      }
    )
  }

  getTotalCartQuantity() {
    const existingCartItem = this.cartService.cartItems.find(item => item.id === this.product.id);
    this.totalCartQuantity = existingCartItem ? existingCartItem.quantity : 0;
  }

  incrementQuantity() {
    if(this.quantity<this.product.unitsInStock)
    this.quantity++;
  }

  decrementQuantity() {
    if(this.quantity>=2)
      this.quantity--;
  }

  addToCart() {
    if (this.quantity + this.totalCartQuantity <= this.product.unitsInStock) {
      this.cartService.addToCart(this.cartItem, this.quantity);
      this.getTotalCartQuantity(); 
    }
  }

  openDeleteModal(){
    let modal= this.modalService.open(DeleteComponent, {
      scrollable: true,
      centered: true,
      animation: true,
      size: 'sm',
    })
    modal.componentInstance.productId = this.product.id;
  }
}
