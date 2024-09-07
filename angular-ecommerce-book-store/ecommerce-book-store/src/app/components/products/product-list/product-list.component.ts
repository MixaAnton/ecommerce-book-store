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
  previousCategoryId: number = 1;
  previosCategoryIds:Array<number> = [];
  singleCategory = false;
  selectedOption=null;
  searchMode = false;
  previousKeyword: string = "";

  pageNumber: number = 1;
  pageSize: number = 9;
  totalElements: number = 0;

  startPrice!:number;
  endPrice!:number;

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
    
  }

  listProducts() {

     this.searchMode = this.route.snapshot.paramMap.has('keyword');
     this.singleCategory = this.route.snapshot.paramMap.has('id');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else if(this.singleCategory){
      this.handleListProducts();
    }
    else{
      this.findByCategories();
    }
  }

  handleSearchProducts() {

    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword != keyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = keyword;

    this.productService.searchProducts(this.pageNumber-1,this.pageSize,keyword).subscribe(
      data => {
        this.processResult(data);
      }
    )
  }

  handleListProducts(){
    const hasCategoryId = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.categoryId = +this.route.snapshot.paramMap.get('id')!;
      if (this.previousCategoryId != this.categoryId) {
        this.pageNumber = 1;
      }

      this.productService.getProductListByCategory(this.pageNumber-1,this.pageSize,this.categoryId).subscribe(
        data => {
          this.processResult(data);
        }
      )
     
    }
    else
      this.categoryId = 0;

      this.previousCategoryId = this.categoryId;
      
  }

  goToCreateNew(){
    this.router.navigate(['/product-create']);
  }
  
  updatePageSize(pageSize: string) {
    this.pageSize = +pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }

  filterByPrice(prices:any){ 
    [this.startPrice,this.endPrice] = [...prices];
  }

  processResult(data:any) {
      this.products = data.content;
        this.pageNumber = data.number +1;
        this.pageSize = data.size;
        this.totalElements = data.totalElements;
  }

   areArraysEqual(arr1: number[], arr2: number[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }
    return arr1.every(item => arr2.includes(item));
  }
  
  findByCategories(){
    this.route.queryParams.subscribe((params)=>{
      
      const categoryIdsString = params['categoryIds'];
      if (categoryIdsString) {
        const categoryIds = categoryIdsString.split(',').map((id:any) => +id);
        if(!this.areArraysEqual(this.previosCategoryIds,categoryIds))
        {
          this.pageNumber = 1;
        }
        this.previosCategoryIds = [...categoryIds];
        this.productService.getProductListByCategories(this.pageNumber-1,this.pageSize,categoryIds).subscribe(response=>{
          this.processResult(response);
        })
      }
      else{
          this.productService.getProductListByCategory(this.pageNumber-1,this.pageSize,0).subscribe(response=>{
            this.processResult(response);
         });
      }
    })
  }
}
