import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrl: './change-role.component.css'
})
export class ChangeRoleComponent {

  roles:any[] = [];
  roleId!:number;
  userId!:number;
  faUser = faUser;
  constructor(private activeModal:NgbActiveModal,private userService:UserService,private notificationService:NotificationService ){

  }

  ngOnInit(){
    this.userService.getRoles().subscribe((response)=>{
      this.roles = response;
    })
  }

  changeRole(){
    this.userService.changeUsersRole(this.userId,this.roleId).subscribe({
      next:()=>{
        this.notificationService.showSuccess("Successful role change","Success");
        this.activeModal.close();
        this.userService.setRoleChanged(true);
      },
      error:()=>{
          this.notificationService.showError("Role change failed","Error");
      }
    })
  }

  closeModal(e: any) {
    e.preventDefault();
    this.activeModal.close();
  }
}
