import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-approve-reject',
  templateUrl: './order-approve-reject.component.html',
  styleUrl: './order-approve-reject.component.css'
})
export class OrderApproveRejectComponent {

  orderId!:number;
  status!:String;

  constructor(private ngbActiveModal:NgbActiveModal){}

  ngOnInit(){
    console.log(this.orderId,this.status);
  }

  close(e:any){
    this.ngbActiveModal.close();
  }

}
