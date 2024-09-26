import { Component } from '@angular/core';
import { Author, Language, Product, ProductEdit } from '../../../common/product';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from '../../../common/product-category';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomeValidators } from '../../../validators/custome-validators';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {

  selectedOption = null;
  product!: Product;
  editProduct!:ProductEdit;
  categories:ProductCategory[] = [];
  languages:Language[] = [];
  authors:Author[] = [];
  authorOptions: { id: number, fullName: string }[] = [];
  editFormGroup!: FormGroup;
  imageToShow:any;
  src = "../../../../assets/images/about-us.jpg";
  allowedExtensions = ['.jpg', '.jpeg', '.png'];
  extension! :string| null;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private formBuilder:FormBuilder,
              private notificationService:NotificationService,
              private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProduct();
    })

    this.productService.getProductCategories().subscribe(response=>{
      this.categories = response;
    })
    this.loadAuthors();
    this.productService.getProductLanguages().subscribe(response=>{
      this.languages = response;
    })

    this.editFormGroup = this.formBuilder.group({
        image:new FormControl(null),
        title: new FormControl({value:'',disabled:true}, [Validators.required,CustomeValidators.notOnlyWhitespace]),
        author:  new FormControl({value:'',disabled:true}, [Validators.required]),
        price:  new FormControl('', [Validators.required,Validators.min(1)]),
        category:  new FormControl({value:'',disabled:true},[Validators.required]),
        unitsInStock:new FormControl(''),
        numOfPages: new FormControl('',[Validators.required,Validators.min(10)]),
        yearOfPublication: new FormControl('',[Validators.required,Validators.min(1900)]),
        language:new FormControl('',[Validators.required]),
        description:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(1000)]),                        
    });
  }

  


  handleProduct() {

    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
        this.imageToShow = this.product.image? `data:image/${this.product.imageExtension};base64,${atob(this.product.image)}` : this.src;
        this.editProduct = new ProductEdit(this.product);
        this.editFormGroup.patchValue({
          title: this.editProduct.name,
          author: this.editProduct.authorId,
          price: this.editProduct.unitPrice,
          category: this.editProduct.categoryId,
          unitsInStock:this.editProduct.unitsInStock,
          numOfPages: this.editProduct.numOfPages,
          yearOfPublication: this.editProduct.yearOfPublication,
          language: this.editProduct.languageId,
          description: this.editProduct.description
        });
      }
    )
  }

  validationMessage :any;
  selectedFile:any;

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

   get image() { return this.editFormGroup.get('image');}  
   get title() { return this.editFormGroup.get('title'); }
   get author() { return this.editFormGroup.get('author'); }
   get price() { return this.editFormGroup.get('price'); }
   get category(){ return this.editFormGroup.get('category');}
   get numOfPages(){ return this.editFormGroup.get('numOfPages');}     
   get unitsInStock(){ return this.editFormGroup.get('unitsInStock');}
   get yearOfPublication() { return this.editFormGroup.get('yearOfPublication');}
   get language() { return this.editFormGroup.get('language');}
   get description() { return this.editFormGroup.get('description');}  

  edit(){
      
      if (this.editFormGroup.invalid) {
        this.editFormGroup.markAllAsTouched();
        return;
      }

      const productData = { 
        description: this.description?.value,
        unitPrice: this.price?.value,
        languageId: this.language?.value,
        numOfPages: this.numOfPages?.value,
        unitsInStock:this.unitsInStock?.value??0,
        yearOfPublication: this.yearOfPublication?.value,
        image: this.selectedFile ? this.selectedFile : null,
        imageExtension: this.extension ? this.extension : null, 
      };
     console.log(productData);
       this.productService.editProduct(productData,this.product.id).subscribe({
           next:(response)=>{

              this.notificationService.showSuccess("The product has been successfully updated.","Success")
              this.router.navigate(['/products']);
              
           },
           error:(error)=>{
              this.notificationService.showError("Error updating product!","Error");
           }
         })
  }
}
