import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { faUser,faUserPlus,faShoppingCart,faSearch,faAngleDown ,faBars} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  faUser=faUser;
  faUserPlus=faUserPlus;
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faAngleDown = faAngleDown;
  faBars = faBars;

  @ViewChild('navbarVertical') 
  navBarVertical!:ElementRef;

  @ViewChild('navbarCollapse') 
  navbarCollapse!:ElementRef;
  

  constructor(private renderer2:Renderer2){}

  showNavBarVertical(){
    let element = this.navBarVertical.nativeElement;
    if(element.classList.contains('show'))
        this.renderer2.removeClass(element,'show');
    else
      this.renderer2.addClass(element,'show');
  }

  showNavBarCollapse(){
      let element = this.navbarCollapse.nativeElement;
      if(element.classList.contains('show'))
          this.renderer2.removeClass(element,'show');
      else
        this.renderer2.addClass(element,'show');
  }

}
