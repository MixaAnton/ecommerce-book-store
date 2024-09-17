import { Component } from '@angular/core';
import { Product } from '../../../common/product';
import { ProductService } from '../../../services/product.service';
import { faSearch,faPlus} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Sorting } from '../../../common/sort';

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
  selectedOption:any;
  searchMode = false;
  previousKeyword: string = "";
  searchTerm:string ="";
  previousSearchTerm: string = "";
  pageNumber: number = 1;
  pageSize: number = 9;
  totalElements: number = 0;
  clearIds:Array<number> = [];
  startPrice:number = 0;
  endPrice:number = 0;
  previousStartPrice:number = 0;
  previousEndPrice:number = 0;
  sort:Sorting = new Sorting();

  sortOptions = [
      { id: 1, name: 'Latest',columnName:'dateCreated',order:'desc' },
      { id: 2, name: 'Oldest',columnName:'dateCreated',order:'asc' },
      { id: 3, name: 'Lowest Price',columnName:'unitPrice',order:'asc' },
      { id: 4, name: 'Highest Price',columnName:'unitPrice',order:'desc' },
  ];

  constructor(private productService: ProductService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
   
    this.sort.columnName =this.sortOptions[0].columnName;
    this.sort.order = this.sortOptions[0].order;
    this.selectedOption = 1;

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
    else if(this.searchTerm)
     {
      this.searchByNameAndAuthor();
     }
     else if(this.endPrice !== 0)
     {
      this.filterByPrice([this.startPrice,this.endPrice]);
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

    this.productService.searchProducts(this.pageNumber-1,this.pageSize,keyword,this.sort).subscribe(
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

      this.productService.getProductListByCategory(this.pageNumber-1,this.pageSize,this.categoryId,this.sort).subscribe(
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
    
    if(this.endPrice > 0)
    {
      this.searchTerm = '';

      if(this.endPrice !== this.previousEndPrice || this.startPrice !== this.previousStartPrice)
      {
        this.pageNumber = 1;
      }
      this.productService.filterProductsByPrice(this.startPrice,this.endPrice,this.previosCategoryIds,this.pageNumber-1,this.pageSize,this.sort).subscribe(res=>{
        this.processResult(res);
      })
    }
    [this.previousStartPrice,this.previousEndPrice] = [this.startPrice,this.endPrice];
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
      this.searchTerm = '';
      this.startPrice = 0;
      this.endPrice = 0;
    
      const categoryIdsString = params['categoryIds'];
      if (categoryIdsString) {
        const categoryIds = categoryIdsString.split(',').map((id:any) => +id);
        if(!this.areArraysEqual(this.previosCategoryIds,categoryIds))
        {
          this.pageNumber = 1;
        }
        this.previosCategoryIds = [...categoryIds];
        this.productService.getProductListByCategories(this.pageNumber-1,this.pageSize,categoryIds,this.sort).subscribe(response=>{
          this.processResult(response);
        })
      }
      else{
        this.previosCategoryIds = [];
          this.productService.getProductListByCategory(this.pageNumber-1,this.pageSize,0,this.sort).subscribe(response=>{
            this.processResult(response);
         });
      }
    })
  }

  sortProducts(event:any){

      this.sort.columnName = this.sortOptions[event-1].columnName;
      this.sort.order = this.sortOptions[event-1].order;
      this.listProducts();
  }

  searchByNameAndAuthor(){
    
    if(this.searchTerm)
    {
      this.startPrice = 0;
      this.endPrice = 0;

      if(this.previousSearchTerm != this.searchTerm)
        this.pageNumber = 1;
      this.previousSearchTerm = this.searchTerm;
      this.productService.searchByProductsOrAuthor(this.pageNumber-1,this.pageSize,this.searchTerm,this.previosCategoryIds,this.sort).subscribe(res=>{
        this.processResult(res);
      })
    }
    
  }
}
