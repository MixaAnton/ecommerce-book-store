import { Component } from '@angular/core';
import { faArrowRight,faEnvelope,faLocation,faMobileAndroid} from '@fortawesome/free-solid-svg-icons';
import { faFacebook,faInstagram,faTwitter} from '@fortawesome/free-brands-svg-icons'
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  faArrowRight = faArrowRight;
  faEnvelope = faEnvelope;
  faLocation = faLocation;
  faMobile = faMobileAndroid;
  faFB = faFacebook;
  faIG = faInstagram;
  faX = faTwitter;
  
  name:any;
  email:any;

  constructor(private notificationService:NotificationService){}

  subscribe(){
      this.notificationService.showSuccess("You have successfully subscribed","Success");
      this.name ="";
      this.email="";
  }

}
