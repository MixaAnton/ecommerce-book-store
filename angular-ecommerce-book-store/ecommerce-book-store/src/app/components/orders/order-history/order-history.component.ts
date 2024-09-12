import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { OrderHistory } from '../../../common/order-history';
import { faCheck, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private orderService:OrderService ) { }

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory() {

    // read the user's email address from browser storage
    //const email = JSON.parse(this.storage.getItem('userEmail')!);
    const email ='q@q.com';
    // retrieve data from the service
    this.orderService.getOrderHistory(email).subscribe(
      data => {
        this.orderHistoryList = data.content;
      }
    );

    this.orderService.getOrders().subscribe(res=>{
      console.log(res);
    })
  }
}
