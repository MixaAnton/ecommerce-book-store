import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from '../../services/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  faUser = faUser;
  loginFormGroup!: FormGroup;
  public jwtHelper = new JwtHelperService();
  constructor(private activeModal:NgbActiveModal,
    private authService:AuthService,
    private formBuilder:FormBuilder,
   private notificationService:NotificationService,
   private router:Router
   ){

  }
  ngOnInit(){

    this.loginFormGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password:  new FormControl('', [Validators.required]),
                         
  });
  }

  login(){

    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      return;
    }

    let loginData ={
        email: this.email?.value,
        password: this.password?.value
    };
    
    this.authService
      .login(loginData)
      .subscribe
      ({
        next: (result) => {
        
          if (result != null && result.token !== null) {
            const token = (<any>result).token;
            const decodedToken = this.jwtHelper.decodeToken(token);
           
            if (decodedToken) {
             
              localStorage.setItem('accessToken', token);
              localStorage.setItem('loggedUser', decodedToken.sub);
              localStorage.setItem('loggedUserName', decodedToken.user);
              localStorage.setItem('userRole',decodedToken.roles[0]);
              localStorage.setItem('userId',decodedToken.userId);
              
              this.notificationService.showSuccess("The user is successfully logged in","Success");
              this.activeModal.close();
              this.authService.setLoggedIn(true);
              this.router.navigate(['/home']);
            }
        } 
      },
      error:(error)=>{
        console.log(error);
        if(error.status == 403)
        {
          this.notificationService.showError("Username or password is incorrect","Error");
        }
        else{
          this.notificationService.showError("Your account does not exist or is not active","Error");
        }
      }
    }); 
  }

  get password() { return this.loginFormGroup.get('password'); }
  get email() { return this.loginFormGroup.get('email'); }

  closeModal(e: any) {
    e.preventDefault();
    this.activeModal.close();
  }
}
