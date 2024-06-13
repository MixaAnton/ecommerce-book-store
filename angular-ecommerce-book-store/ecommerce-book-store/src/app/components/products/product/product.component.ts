import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCartShopping,faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  faCart= faCartShopping;
  faEye = faEye;
  constructor(private router:Router){
  }
  goToDedatils(id:number){
    this.router.navigate(['/product/'+id]);
}
}
