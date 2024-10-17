import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookingsComponent } from './bookings/bookings.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'lab-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, BookingsComponent],
  template: `
    <lab-header />
    <lab-bookings />
    <router-outlet />
    <lab-footer />
  `,
  styles: [],
})
export class AppComponent {}
