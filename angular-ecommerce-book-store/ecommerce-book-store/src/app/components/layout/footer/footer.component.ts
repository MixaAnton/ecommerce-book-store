import { Component } from '@angular/core';
import { faArrowRight,faEnvelope,faLocation,faMobileAndroid} from '@fortawesome/free-solid-svg-icons';
import { faFacebook,faInstagram,faTwitter} from '@fortawesome/free-brands-svg-icons'

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

}
