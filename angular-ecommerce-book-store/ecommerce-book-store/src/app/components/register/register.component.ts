import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomeValidators } from '../../validators/custome-validators';
import { NotificationService } from '../../services/notification/notification.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerFormGroup!: FormGroup;


  constructor(private authService:AuthService,private formBuilder:FormBuilder,
    private notificationService:NotificationService,private router:Router,private modalService:NgbModal){
  }

  ngOnInit(){
    this.registerFormGroup = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required,CustomeValidators.notOnlyWhitespace,Validators.minLength(2)]),
      lastName:  new FormControl('', [Validators.required,CustomeValidators.notOnlyWhitespace,Validators.minLength(2)]),
      email:  new FormControl('', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      username:new FormControl('',[Validators.required,CustomeValidators.notOnlyWhitespace,Validators.minLength(2)]),
      password:  new FormControl('',[Validators.required,Validators.minLength(5)]),
      confirmPassword: new FormControl('',[Validators.required,Validators.minLength(5)]),                      
  },{
    validators:[,this.mustMatch('password','confirmPassword')]
  });
  }

  mustMatch(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get firstName() { return this.registerFormGroup.get('firstName'); }
  get lastName() { return this.registerFormGroup.get('lastName'); }
  get email() { return this.registerFormGroup.get('email'); }
  get username() { return this.registerFormGroup.get('username'); }
  get password() { return this.registerFormGroup.get('password'); }
  get confirmPassword() { return this.registerFormGroup.get('confirmPassword'); }

  register(){
    if (this.registerFormGroup.invalid) {
      this.registerFormGroup.markAllAsTouched();
      return;
    }
    
    const registerData = 
      {
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        email: this.email?.value,
        userName: this.username?.value,
        password: this.password?.value
      };

      this.authService.register(registerData).subscribe({
        next:()=>{
          this.notificationService.showSuccess("Your registration is successful","Succes");
          this.router.navigate(['/home']);
          let modalRef = this.modalService.open(LoginComponent, {
            scrollable: true,
            centered: true,
            animation: true,
            size: 'md',
          });
        },
        error:()=>{
          this.notificationService.showError("Registration failed","Error");
        }
      })
    
  }
}
