import { Component } from '@angular/core';
import { ProductCategory } from '../../../common/product-category';
import { ProductService } from '../../../services/product.service';
import { Author, Language, Product, ProductCreate } from '../../../common/product';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {
  selectedOption = null;
  categories:ProductCategory[] = [];
  product = {} as ProductCreate;
  languages:Language[] = [];
  authors:Author[] = [];
  authorOptions: { id: number, fullName: string }[] = [];

  constructor(private productService:ProductService){}

  ngOnInit():void{
      this.productService.getProductCategories().subscribe(response=>{
        this.categories = response;
      })
      this.loadAuthors();
      this.productService.getProductLanguages().subscribe(response=>{
        this.languages = response;
      })
  }

  validationMessage :any;
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];

    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!allowedExtensions.includes('.' + fileExtension)) {
        this.validationMessage = true;
        event.target.value = null;
        return;
      } else {
        this.validationMessage = false;
      }
      this.selectedFile = file;
    }
  }

  loadAuthors(): void {
    this.productService.getProductAuthors().subscribe(response => {
      this.authors = response;
      this.authorOptions = this.authors.map(author => ({
        id: author.id,
        fullName: `${author.firstName} ${author.lastName}`
      }));

    });
  }
}
