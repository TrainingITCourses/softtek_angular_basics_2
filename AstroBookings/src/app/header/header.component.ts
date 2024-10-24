import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lab-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header>
      <nav>
        <a routerLink="">{{ title }}</a>
        <section>
          @for (item of menu; track item.link) {
          <span>
            <a [routerLink]="item.link">{{ item.title }}</a>
          </span>
          }
        </section>
      </nav>
    </header>
  `,
  styles: ``,
})
export class HeaderComponent {
  title = 'Astro Bookings';
  menu = [
    {
      title: '🌍 Home',
      link: '/',
    },
    {
      title: '🎟️ Bookings',
      link: '/launches/id/bookings',
    },
    {
      title: '📘 About us',
      link: '/about',
    },
    {
      title: '🔐 Log In',
      link: '/login',
    },
  ];
}
