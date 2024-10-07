import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { faUser,faUserPlus,faAngleDown ,faBars} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../login/login.component';
import { ProductCategory } from '../../../common/product-category';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service';
import { RoleEnum } from '../../../enums/role-enum';
import { UserInfoComponent } from '../../user/user-info/user-info.component';
import { UserService } from '../../../services/user.service';
import { JwtService } from '../../../services/jwt.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  faUser=faUser;
  faUserPlus=faUserPlus;
  
  faAngleDown = faAngleDown;
  faBars = faBars;

  categories: ProductCategory[] = [];

  @ViewChild('navbarVertical') 
  navBarVertical!:ElementRef;

  @ViewChild('navbarCoders') 
  navBarCoders!:ElementRef;

  @ViewChild('navbarCollapse') 
  navbarCollapse!:ElementRef;
  
  user = localStorage.getItem("loggedUserName");
  isManager:boolean = false;
  isUser:boolean = false;

  constructor(private renderer2:Renderer2,
    private modalService:NgbModal,private productService:ProductService,
    private authService:AuthService,private userService:UserService,
    private jwtService:JwtService
  ){}

  ngOnInit(){
    this.productService.getProductCategories().subscribe((response)=>{
      this.categories = response;
    })

    this.authService.isLoggedInObservable.subscribe((loggedIn) => {
      if (loggedIn) {
        this.isUser = this.jwtService.hasRole(RoleEnum.User);
        this.user = localStorage.getItem('loggedUserName');
        this.isManager = this.jwtService.hasRole(RoleEnum.Manager);
        
      } else {
        this.user = null;
        this.isUser = false;
        this.isManager = false;
      }
    });

    this.userService.isInfoChangedObservable.subscribe((inofChanged)=>{
      if(inofChanged)
      {
        this.user = localStorage.getItem('loggedUserName');
      }
    })
  }

  showNavBarVertical(){
    let element = this.navBarVertical.nativeElement;
    if(element.classList.contains('show'))
        this.renderer2.removeClass(element,'show');
    else
      this.renderer2.addClass(element,'show');
  }

  showNavBarCoders(){
    let element = this.navBarCoders.nativeElement;
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
  login() {
    let modalRef = this.modalService.open(LoginComponent, {
      scrollable: true,
      centered: true,
      animation: true,
      size: 'md',
    });
  }

  logout(){
    this.authService.logout();
  }

  viewDetails(){
    let modalRef = this.modalService.open(UserInfoComponent, {
      scrollable: true,
      centered: true,
      animation: true,
      size: 'md',
    });
  }
}
