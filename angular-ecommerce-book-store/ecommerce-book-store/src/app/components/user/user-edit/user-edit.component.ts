import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomeValidators } from '../../../validators/custome-validators';
import { User } from '../../../common/user';
import { UserService } from '../../../services/user.service';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {

  editFormGroup!: FormGroup;
  user!:User;
  constructor(private activeModal:NgbActiveModal,private formBuilder:FormBuilder,
    private userService:UserService,private notificationService:NotificationService){

  }
  ngOnInit(){

    this.editFormGroup = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required,CustomeValidators.notOnlyWhitespace,Validators.minLength(2)]),
      lastName:  new FormControl('', [Validators.required,CustomeValidators.notOnlyWhitespace,Validators.minLength(2)]),
      email:  new FormControl('', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      username:new FormControl('',[Validators.required,CustomeValidators.notOnlyWhitespace,Validators.minLength(2)])                     
  });
  this.editFormGroup.patchValue({
    firstName: this.user.firstName,
    lastName: this.user.lastName,
    email: this.user.email,
    username: this.user.userName,
  });
  }
  
  get firstName() { return this.editFormGroup.get('firstName'); }
  get lastName() { return this.editFormGroup.get('lastName'); }
  get email() { return this.editFormGroup.get('email'); }
  get username() { return this.editFormGroup.get('username'); }

  edit(){
    if (this.editFormGroup.invalid) {
      this.editFormGroup.markAllAsTouched();
      return;
    }

    let userUpdate = {
      username:this.username?.value,
      email:this.email?.value,
      firstName:this.firstName?.value,
      lastName:this.lastName?.value
    }
    this.userService.editUser(userUpdate).subscribe({
      next:(response)=>{
        
        this.notificationService.showSuccess("Successful change of user information","Success");
        localStorage.setItem('loggedUserName', response.userName);
        this.userService.setInfoChanged(true);
        this.activeModal.close();
      },
      error:(error)=>{
        this.notificationService.showError("Data modification failed","Error");
        this.activeModal.close();
      }
    },
    
  )
  }

  closeModal(e: any) {
    e.preventDefault();
    this.activeModal.close();
  }
}
