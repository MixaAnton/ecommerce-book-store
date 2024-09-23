import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {

  order:any;
  src="../../../../assets/images/about-us.jpg"
  
  constructor(private orderService:OrderService,private route:ActivatedRoute){}

  ngOnInit(){
    const orderId: number = +this.route.snapshot.paramMap.get('id')!;

    this.orderService.getOrderDetails(orderId).subscribe((res)=>{
      this.order = res;
    }
    );
  }

  convertImage(image:any,imageExtension:any)
  {
     return image?`data:image/${imageExtension};base64,${atob(image)}` : this.src;
  }
}
