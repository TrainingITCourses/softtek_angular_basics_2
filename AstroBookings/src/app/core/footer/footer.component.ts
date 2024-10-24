import { Component } from '@angular/core';

@Component({
  selector: 'lab-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  author = {
    name: 'Softtek',
    homepage: 'https://www.softtek.com/',
  };

  year = new Date().getFullYear();

  cookiesAccepted = false;

  onAcceptClick() {
    console.log('Accept clicked');
    this.cookiesAccepted = true;
    console.log('Cookies accepted:', this.cookiesAccepted);
  }
}
