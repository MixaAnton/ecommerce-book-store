import { Component } from '@angular/core';
import { ProductCategory } from '../../../common/product-category';
import { ProductService } from '../../../services/product.service';
import { Author, Language, Product, ProductCreate } from '../../../common/product';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomeValidators } from '../../../validators/custome-validators';

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
  createFormGroup!: FormGroup;


  constructor(private productService:ProductService,private formBuilder:FormBuilder){}

  ngOnInit():void{
      this.productService.getProductCategories().subscribe(response=>{
        this.categories = response;
      })
      this.loadAuthors();
      this.productService.getProductLanguages().subscribe(response=>{
        this.languages = response;
      })

      this.createFormGroup = this.formBuilder.group({
        title: new FormControl('', [Validators.required,CustomeValidators.notOnlyWhitespace]),
        author:  new FormControl('', [Validators.required]),
        price:  new FormControl('', [Validators.required,Validators.min(1)]),
        category:  new FormControl('',[Validators.required]),
        numOfPages: new FormControl('',[Validators.required,Validators.minLength(10)]),
        yearOfPublication: new FormControl('',[Validators.required,Validators.min(1900)]),
        language:new FormControl('',[Validators.required]),
        description:new FormControl('',[Validators.required,Validators.min(10)]),
        image: new FormControl('')                        
    });
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

  get title() { return this.createFormGroup.get('title'); }
   get author() { return this.createFormGroup.get('author'); }
   get price() { return this.createFormGroup.get('price'); }
   get category(){ return this.createFormGroup.get('category');}
   get numOfPages(){ return this.createFormGroup.get('numOfPages');}     
   get yearOfPublication() { return this.createFormGroup.get('yearOfPublication');}
   get language() { return this.createFormGroup.get('language');}
   get description() { return this.createFormGroup.get('description');}
   get image(){ return this.createFormGroup.get('image');}  

   createProduct(){
    if (this.createFormGroup.invalid) {
      this.createFormGroup.markAllAsTouched();
      return;
    }
   }
}
