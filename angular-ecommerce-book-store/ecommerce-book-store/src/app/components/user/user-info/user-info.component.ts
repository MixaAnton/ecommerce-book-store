import { Component } from '@angular/core';
import { faUser,faLocationDot,faCity,faGlobe,faEnvelope,faMobileScreen,faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { UserService } from '../../../services/user.service';
import { User } from '../../../common/user';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { ChangeRoleComponent } from '../change-role/change-role.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  user!:User;
  faUser = faUser;
  faCircleUSer = faCircleUser;
  faLocation = faLocationDot;
  faCity = faCity;
  faGlobe = faGlobe;
  faEnvelope = faEnvelope;
  faPhone = faMobileScreen;

constructor(private modalService:NgbModal,private activeModal:NgbActiveModal,private userService:UserService){}
ngOnInit(){
  let userId = localStorage.getItem('userId');
  
  if(userId)
    this.userService.getUser(parseInt(userId)).subscribe((response)=>{
      this.user = response;
  })
}

  changePassword(){
    this.activeModal.close()
    let modalRef = this.modalService.open(ChangePasswordComponent, {
      scrollable: true,
      centered: true,
      animation: true,
      size: 'md',
    });
    
  }
  goToEdit(){
    this.activeModal.close()
    let modalRef = this.modalService.open(UserEditComponent, {
      scrollable: true,
      centered: true,
      animation: true,
      size: 'md',
    });
    modalRef.componentInstance.user = this.user;
  }

  closeModal(){
    this.activeModal.close()
  }
}
