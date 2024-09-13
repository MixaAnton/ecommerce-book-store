import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { OrderHistory } from '../../../common/order-history';
import { faCheck, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderApproveRejectComponent } from '../order-approve-reject/order-approve-reject.component';
import { StatusEnum } from '../../../enums/status-enum';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {

  orderHistoryList: OrderHistory[] = [];
  storage: Storage = sessionStorage;
  faCheck = faCheck;
  faTimes = faTimes;
  faEye = faEye;
  statsuCreated = StatusEnum.Created;
  statusApproved = StatusEnum.Approved;
  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  constructor(private orderService:OrderService,private modalService:NgbModal ) { }

  ngOnInit(): void {
    this.handleOrderHistory();
    this.orderService.orderId.subscribe((res)=>{
      if(res !=0)
        this.handleOrderHistory();
    })
  }

  handleOrderHistory() {

    // read the user's email address from browser storage
    const email = JSON.parse(this.storage.getItem('userEmail')!);
  
    if(email)
      this.orderService.getOrderHistory(email,this.pageNumber-1,this.pageSize).subscribe(
        data => {
          
          this.processResult(data);
        }
      );
    else
      this.orderService.getOrders(this.pageNumber-1,this.pageSize).subscribe(data=>{
        this.processResult(data);
        console.log(data);
      })
  }

  approveOrder(orderId:any){
   let modal= this.modalService.open(OrderApproveRejectComponent, {
      scrollable: true,
      centered: true,
      animation: true,
      size: 'sm',
    })
    modal.componentInstance.orderId = orderId;
    modal.componentInstance.status = StatusEnum.Approved;
  }
  rejectOrder(orderId:any){
    let modal= this.modalService.open(OrderApproveRejectComponent, {
      scrollable: true,
      centered: true,
      animation: true,
      size: 'md',
    })
    modal.componentInstance.orderId = orderId;
    modal.componentInstance.status = StatusEnum.Rejected;
  }

  processResult(data:any) {
    this.orderHistoryList = data.content;
      this.pageNumber = data.number +1;
      this.pageSize = data.size;
      this.totalElements = data.totalElements;
}
}
