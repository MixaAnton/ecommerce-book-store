import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../../services/notification/notification.service';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  changePasswordForm!: FormGroup;
  faKey = faKey;

  constructor(
    public activeModal: NgbActiveModal,
    private notifyService: NotificationService,
    private userService:UserService,
    private fb: FormBuilder
  ) {}
  
  closeModal(e: any) {
    e.preventDefault();
    this.activeModal.close();
  }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required,Validators.minLength(5)]],
      confirmNewPassword: ['', Validators.required]
    }, 
    { 
      validators:[
          this.mustMatch( 'newPassword', 'confirmNewPassword'),
          this.cannotMatchCurrentPassword('currentPassword', 'newPassword')
          ] 
    }
    );
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

  cannotMatchCurrentPassword(controlName:string,matchingControlName:string){
    return (formGroup: FormGroup) =>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if(matchingControl.errors && !matchingControl.errors['cannotMatchCurrentPassword'])
        return;
      if (control.value === matchingControl.value) {
        matchingControl.setErrors({ cannotMatchCurrentPassword: true });
      } else {
        matchingControl.setErrors(null);
      }

    }
  }

  get currentPassword() { return this.changePasswordForm.get('currentPassword'); }
  get newPassword() { return this.changePasswordForm.get('newPassword'); }
  get confirmNewPassword() { return this.changePasswordForm.get('confirmNewPassword'); }

  changePassword(): void {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    const changePasswordData = this.changePasswordForm.value;
    
    this.userService.changePassword(changePasswordData).subscribe(
       {
        next:(response)=>{
          this.notifyService.showSuccess("You have successfully changed your password","Success");
          this.activeModal.close();
        },
        error:(response)=>{
          this.notifyService.showError("Changing the password did not work","Error");
          this.activeModal.close();
        }
      } 
    )
  }

}
