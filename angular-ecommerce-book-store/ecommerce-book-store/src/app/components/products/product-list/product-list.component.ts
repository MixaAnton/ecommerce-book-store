import { Component } from '@angular/core';
import { Product } from '../../../common/product';
import { ProductService } from '../../../services/product.service';
import { faSearch,faPlus} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  faSearch = faSearch;
  faPlus = faPlus;

  products: Product[] = [];
  isAdmin = true;

  selectedOption=null;

  sortOptions = [
      { id: 1, name: 'Latest' },
      { id: 2, name: 'Oldest' },
      { id: 3, name: 'Lowest Price' },
      { id: 4, name: 'Highest Price' },
  ];

  constructor(private productService: ProductService,private router:Router) { }

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }

  goToCreateNew(){
    this.router.navigate(['/product-create']);
  }
 
  
}
