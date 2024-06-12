import { Component } from '@angular/core';
import { faTruckFast,faCheck,faArrowRightArrowLeft,faPhoneVolume } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  faTruck = faTruckFast; 
  faCheck = faCheck;
  faArrows = faArrowRightArrowLeft;
  faPhone = faPhoneVolume;
}
