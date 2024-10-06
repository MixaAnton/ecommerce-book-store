import { Component } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StatusEnum } from '../../../enums/status-enum';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { EmailService } from '../../../services/email.service';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-order-approve-reject',
  templateUrl: './order-approve-reject.component.html',
  styleUrl: './order-approve-reject.component.css'
})
export class OrderApproveRejectComponent {

  orderId!:number;
  status!:String;
  faTimes = faTimes;
  approveStatus = StatusEnum.Approved;
  
  constructor(private ngbActiveModal:NgbActiveModal,private orderService:OrderService,
    private roter:Router,private emailService:EmailService,
    private notificationService:NotificationService){}

  ngOnInit(){
    
  }

  closeModal(e:any){
    this.ngbActiveModal.close();
  }

  approveOrReject(){

    this.orderService.changeOrderStatus(this.orderId,this.status).subscribe({
        next:(response)=>{
          this.orderService.setOrderId(response.id);
          this.notificationService.showInfo("Order status successfully changed","Success");
          this.ngbActiveModal.close();
        },
        error:()=>{
          this.notificationService.showError("Something wrong happened","Error");
          this.ngbActiveModal.close();
        }
      })
  }
}
