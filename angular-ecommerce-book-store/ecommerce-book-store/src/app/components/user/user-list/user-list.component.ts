import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { User } from '../../../common/user';
import { faPeopleArrows, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { DeleteComponent } from '../../delete/delete.component';
import { ChangeRoleComponent } from '../change-role/change-role.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  usersList: User[] = [];
  faActive = faToggleOff;
  faRoles = faPeopleArrows;
  
  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  constructor(private modalService:NgbModal,private userService:UserService ) { }

  ngOnInit(): void {
    this.handleUsersList();
    this.userService.userId.subscribe((res)=>{
      if(res !=0)
        this.handleUsersList();
    })

    this.userService.statusChangedObservable.subscribe((res)=>{
      if(res)
        this.handleUsersList();
    });

    this.userService.roleChangedObservable.subscribe((res)=>{
      if(res)
        this.handleUsersList();
    })
  }

  handleUsersList() {

      this.userService.getUsers(this.pageNumber-1,this.pageSize).subscribe(data=>{
        this.processResult(data);

      })
  }

  setActivity(userId:any,active:boolean){
   let modal= this.modalService.open(DeleteComponent, {
      scrollable: true,
      centered: true,
      animation: true,
      size: 'sm',
    })
    modal.componentInstance.userId = userId;
    modal.componentInstance.active = active;
  }

  addRole(userId:any,roleId:any){
    let modal= this.modalService.open(ChangeRoleComponent, {
      scrollable: true,
      centered: true,
      animation: true,
      size: 'md',
    })
    modal.componentInstance.userId = userId;
    modal.componentInstance.roleId = roleId;
  }

  processResult(data:any) {
    this.usersList = data.content;
      this.pageNumber = data.number +1;
      this.pageSize = data.size;
      this.totalElements = data.totalElements;
}
}
