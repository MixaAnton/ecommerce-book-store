import { Component } from '@angular/core';
import { Author, Language, Product, ProductEdit } from '../../../common/product';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from '../../../common/product-category';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomeValidators } from '../../../validators/custome-validators';

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

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private formBuilder:FormBuilder) { }

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
        numOfPages: new FormControl('',[Validators.required,Validators.min(10)]),
        yearOfPublication: new FormControl('',[Validators.required,Validators.min(1900)]),
        language:new FormControl('',[Validators.required]),
        description:new FormControl('',[Validators.required,Validators.minLength(10)]),                        
    });
  }

  


  handleProduct() {

    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
        this.editProduct = new ProductEdit(this.product);
        this.editFormGroup.patchValue({
          title: this.editProduct.name,
          author: this.editProduct.authorId,
          price: this.editProduct.unitPrice,
          category: this.editProduct.categoryId,
          numOfPages: this.editProduct.numOfPages,
          yearOfPublication: this.editProduct.yearOfPublication,
          language: this.editProduct.languageId,
          description: this.editProduct.description
        });
      }
    )
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

   get image() { return this.editFormGroup.get('image');}  
   get title() { return this.editFormGroup.get('title'); }
   get author() { return this.editFormGroup.get('author'); }
   get price() { return this.editFormGroup.get('price'); }
   get category(){ return this.editFormGroup.get('category');}
   get numOfPages(){ return this.editFormGroup.get('numOfPages');}     
   get yearOfPublication() { return this.editFormGroup.get('yearOfPublication');}
   get language() { return this.editFormGroup.get('language');}
   get description() { return this.editFormGroup.get('description');}  

  edit(){
      console.log(this.language?.value);
      if (this.editFormGroup.invalid) {
        this.editFormGroup.markAllAsTouched();
        return;
      }
  }
}
