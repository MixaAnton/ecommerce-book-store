import { Component } from '@angular/core';
import { faUser,faLocationDot,faCity,faGlobe,faEnvelope,faMobileScreen,faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {

  faUser = faUser;
  faCircleUSer = faCircleUser;
  faLocation = faLocationDot;
  faCity = faCity;
  faGlobe = faGlobe;
  faEnvelope = faEnvelope;
  faPhone = faMobileScreen;

constructor(private modalService:NgbModal){}

  goToEdit(){

    let modalRef = this.modalService.open(UserEditComponent, {
      scrollable: true,
      centered: true,
      animation: true,
      size: 'md',
    });
  }
}
