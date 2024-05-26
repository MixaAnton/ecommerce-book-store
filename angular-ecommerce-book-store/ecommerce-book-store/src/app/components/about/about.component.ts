import { Component } from '@angular/core';
import { faBook,faTruckFast,faMoneyBill1Wave,faHandshakeSimple} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
   faBook = faBook;
   faTruck = faTruckFast; 
   faMoney = faMoneyBill1Wave;
   faHandshake = faHandshakeSimple; 
  }
