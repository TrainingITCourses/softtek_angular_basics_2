import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import LAUNCHES_DB from '../../../db/launches.json';
import { LaunchDto } from '../../shared/models/launch.dto';
import { LaunchBlock } from '../../shared/ui/launch.block';
@Component({
  selector: 'lab-home',
  standalone: true,
  imports: [RouterLink, LaunchBlock],
  template: `
    @for(launch of launches(); track launch.id){
    <article>
      <lab-launch [launch]="launch"></lab-launch>
      <footer>
        <button class="outline" [routerLink]="['launches', launch.id, 'bookings']">
          Book now!
        </button>
      </footer>
    </article>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  launches = signal<LaunchDto[]>(LAUNCHES_DB);
}
// http://localhost:4218/launches/lnch_1/bookings

// http://localhost:4218/launches/lnch_3/bookings
