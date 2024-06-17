import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {


  constructor(private activeModal:NgbActiveModal){

  }

  closeModal(e: any) {
    e.preventDefault();
    this.activeModal.close();
  }
}
