import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../common/product';
import { ProductCategory, ProductCategoryCheck } from '../../../common/product-category';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prodcut-category-filters',
  templateUrl: './prodcut-category-filters.component.html',
  styleUrl: './prodcut-category-filters.component.css'
})
export class ProdcutCategoryFiltersComponent {

  categories:ProductCategoryCheck [] = [ ]
  allChecked: boolean = true;
  categoryIds:number[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.listProductCategories();

    this.route.queryParams.subscribe(params => {
      const categoryIdsParam = params['categoryIds'];
      if (categoryIdsParam) {
        this.categoryIds = categoryIdsParam.split(',').map((id: string) => parseInt(id, 10));
      }

      this.updateCategorySelection();
    });
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe((response) => {
      this.categories = response.map(category => new ProductCategoryCheck(category.id, category.categoryName, false));
      this.updateCategorySelection();
      this.allChecked = this.areAllCategoriesChecked();
    });
  }

  updateCategorySelection(): void {
    if (this.categoryIds.length > 0) {
      this.categories = this.categories.map(category => ({
        ...category,
        checked: this.categoryIds.includes(category.id)
      }));
    }
    this.allChecked = this.areAllCategoriesChecked();
  }

  onCategoryChange(e: any, id: any): void {
    const isChecked = e.target.checked;
    this.allChecked = false;

    if (isChecked) {
      this.categoryIds.push(id);
    } else {
      this.categoryIds = this.categoryIds.filter(categoryId => categoryId !== id);
    }

    this.categories = this.categories.map(category =>
      category.id === id ? { ...category, checked: isChecked } : category
    );

    this.allChecked = this.areAllCategoriesChecked();

    if (this.categoryIds.length > 0) {
      this.router.navigate(['/products'], { queryParams: { categoryIds: this.categoryIds.join(',') } });
    } else {
      this.router.navigate(['/products']);
    }
  }

  toggleAllCategories(e: any): void {

    const isChecked = e.target.checked;

    if (isChecked) {
      this.categories.forEach(category => category.checked = false);
      this.categoryIds = [];
      this.router.navigate(['/products']);
    }

    this.allChecked = isChecked;
  }

  areAllCategoriesChecked(): boolean {
    return this.categories.every(category => !category.checked);
  }
}
