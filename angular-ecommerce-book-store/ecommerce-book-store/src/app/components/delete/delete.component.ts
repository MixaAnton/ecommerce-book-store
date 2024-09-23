import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {

  productId!:number;
  status!:String;
  faTimes = faTimes;
  
  
  constructor(private ngbActiveModal:NgbActiveModal,
    private productService:ProductService,
    private router:Router,
    private notificationService:NotificationService){}

  ngOnInit(){
    
  }

  closeModal(e:any){
    this.ngbActiveModal.close();
  }

  deleteProduct(){

    this.productService.deleteProduct(this.productId).subscribe({
      
      next:(response)=>{
        this.notificationService.showSuccess("The product has been successfully deleted.","Success")
        this.ngbActiveModal.close();
        this.router.navigate(['/products']);
        
     },
     error:(error)=>{
        this.notificationService.showError("Error deleting product!","Error");
     }
      
    })
  }
}
