import { Component } from '@angular/core';
import { faTruckFast,faCheck,faArrowRightArrowLeft,faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';

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
  lastThreeProducts:Product[] = [];

  constructor(private productService:ProductService){}

  ngOnInit(){
    this.productService.getLastThreeProducts().subscribe(response=>{
      this.lastThreeProducts = response;
    })
  }
}
