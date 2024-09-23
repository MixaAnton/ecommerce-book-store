import { Component } from '@angular/core';
import { faEnvelope, faLocation, faMobileAndroid,faClock } from '@fortawesome/free-solid-svg-icons';
import { EmailService } from '../../services/email.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  faEnvelope = faEnvelope;
  faLocation = faLocation;
  faMobile = faMobileAndroid;
  faClock = faClock;
  emailFormGroup!: FormGroup;

  constructor(private emailService:EmailService,
    private formBuilder:FormBuilder,
  private notificationService:NotificationService,
  private router:Router){}

  ngOnInit(){

    this.emailFormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email:  new FormControl('', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      subject:  new FormControl('', [Validators.required]),
      message:new FormControl('',[Validators.required,Validators.minLength(25)]),                        
  });
  }

  sendEmail(){

    if (this.emailFormGroup.invalid) {
      this.emailFormGroup.markAllAsTouched();
      return;
    }

   let emailRequest = {
      name : this.name?.value,
      email:this.email?.value,
      subject: this.subject?.value,
      message:this.message?.value
    }

    this.emailService.sendEmail(emailRequest).subscribe({
      next:(response)=>{
        this.notificationService.showSuccess(response,"Success");
        this.router.navigate(['/home']);
      },
      error:()=>{
        this.notificationService.showError("Error sending email","Error");
      }
    })
  }

  get name() { return this.emailFormGroup.get('name'); }
  get email() { return this.emailFormGroup.get('email'); }
  get subject() { return this.emailFormGroup.get('subject'); }
  get message(){ return this.emailFormGroup.get('message');} 

}
