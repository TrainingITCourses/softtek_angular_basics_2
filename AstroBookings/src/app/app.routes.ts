import { Routes } from '@angular/router';
import { BookingsComponent } from './bookings/bookings.component';

export const routes: Routes = [
  {
    path: '',
    component: undefined,
  },
  {
    path: 'launches/id/bookings',
    component: BookingsComponent,
  },
];
