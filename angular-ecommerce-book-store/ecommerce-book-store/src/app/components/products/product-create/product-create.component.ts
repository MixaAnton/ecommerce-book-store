import { Component } from '@angular/core';
import { ProductCategory } from '../../../common/product-category';
import { ProductService } from '../../../services/product.service';
import { Author, Language, Product, ProductCreate } from '../../../common/product';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomeValidators } from '../../../validators/custome-validators';
import { NotificationService } from '../../../services/notification/notification.service';
import { Router } from '@angular/router';

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
  allowedExtensions = ['.jpg', '.jpeg', '.png'];
  extension! :string| null;
  
  constructor(private productService:ProductService,
              private formBuilder:FormBuilder,
              private notificationService:NotificationService,
              private router:Router){}

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
        unitsInStock:new FormControl(''),
        category:  new FormControl('',[Validators.required]),
        numOfPages: new FormControl('',[Validators.required,Validators.minLength(10)]),
        yearOfPublication: new FormControl('',[Validators.required,Validators.min(1900)]),
        language:new FormControl('',[Validators.required]),
        description:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(1000)]),
        image: new FormControl('')                        
    });
  }

  validationMessage :any;
  selectedFile: any;

  onFileSelected(event: any) {
   
    const file:File= event.target.files[0];
    const reader = new FileReader();
    this.extension = file.type.split('/')[1];
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.selectedFile =  reader.result?.toString().split(',')[1];
        
    };
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
   get unitsInStock(){ return this.createFormGroup.get('unitsInStock');}     
   get yearOfPublication() { return this.createFormGroup.get('yearOfPublication');}
   get language() { return this.createFormGroup.get('language');}
   get description() { return this.createFormGroup.get('description');}
   get image(){ return this.createFormGroup.get('image');}  

   createProduct(){
    if (this.createFormGroup.invalid) {
      this.createFormGroup.markAllAsTouched();
      return;
    }
      const productData = {
        name: this.title?.value,
        description: this.description?.value,
        unitPrice: this.price?.value,
        categoryId: this.category?.value,
        authorId: this.author?.value,
        languageId: this.language?.value,
        numOfPages: this.numOfPages?.value,
        yearOfPublication: this.yearOfPublication?.value,
        unitsInStock:this.unitsInStock?.value??0,
        image: this.selectedFile ? this.selectedFile : null,
        imageExtension:this.extension? this.extension : null 
      };
     
       this.productService.create(productData).subscribe({
           next:(response)=>{
              this.notificationService.showSuccess("The product has been successfully saved.","Success")
              this.router.navigate(['/products']);
           },
           error:(error)=>{
              this.notificationService.showError("Error saving product!","Error");
           }
         })
   }
}
