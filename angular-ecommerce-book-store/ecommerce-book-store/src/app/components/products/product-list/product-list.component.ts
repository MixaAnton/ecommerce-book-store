import { Component } from '@angular/core';
import { Product } from '../../../common/product';
import { ProductService } from '../../../services/product.service';
import { faSearch,faPlus, faL} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from '../../../common/product-category';

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
  categoryId!:number;

  selectedOption=null;
  searchMode = false;

  sortOptions = [
      { id: 1, name: 'Latest' },
      { id: 2, name: 'Oldest' },
      { id: 3, name: 'Lowest Price' },
      { id: 4, name: 'Highest Price' },
  ];

  constructor(private productService: ProductService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
  
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });

    this.route.queryParams.subscribe((params)=>{

      const categoryIdsString = params['categoryIds'];
      if (categoryIdsString) {
        const categoryIds = categoryIdsString.split(',').map((id:any) => +id);
        this.productService.getProductListByCategories(categoryIds).subscribe(response=>{
          console.log(response);
        })
      } else {
        this.productService.getProductListByCategory(0).subscribe(response=>{
          console.log(response);
        })
      }
    })
    
  }

  listProducts() {

     this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {

    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    this.productService.searchProducts(keyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleListProducts(){
    const hasCategoryId = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId)
      this.categoryId = +this.route.snapshot.paramMap.get('id')!;
    else
      this.categoryId = 0;

    this.productService.getProductListByCategory(this.categoryId).subscribe(
      data => {
        this.products = data;
        console.log(data);
      }
    )
  }

  goToCreateNew(){
    this.router.navigate(['/product-create']);
  }
  
}
