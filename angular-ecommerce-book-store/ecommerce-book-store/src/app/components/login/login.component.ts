import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  faUser = faUser;

  constructor(private activeModal:NgbActiveModal){

  }

  closeModal(e: any) {
    e.preventDefault();
    this.activeModal.close();
  }
}
