import { Component } from '@angular/core';
import { faEnvelope, faLocation, faMobileAndroid,faClock } from '@fortawesome/free-solid-svg-icons';

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
}
