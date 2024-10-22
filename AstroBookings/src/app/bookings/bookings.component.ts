import { CurrencyPipe, DatePipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LaunchDto } from '../models/launch.dto';
import { LaunchTitlePipe } from './launch-title.pipe';

@Component({
  selector: 'lab-bookings',
  standalone: true,
  imports: [UpperCasePipe, CurrencyPipe, DatePipe, DecimalPipe, LaunchTitlePipe],
  template: `
    <article>
      <header>
        <h2>{{ launch | launchTitle : ' 🧑‍🚀 ' }}</h2>
        <div [class]="launch.status">
          <span>{{ launch.pricePerSeat | currency : 'USD' : 'symbol' : '1.0-0' }}</span>
          <span>{{ launch.date | date : 'dd MMM yyyy' }}</span>
          <span>{{ launch.status | uppercase }}</span>
        </div>
      </header>
      <main>
        <p>Travelers: {{ currentTravelers }}</p>
      </main>
      <footer>
        <button>Book now!</button>
        <button>Cancel</button>
      </footer>
    </article>
  `,
  styles: `
  .scheduled {
      color: violet;
      font-style: italic;
    }
    .confirmed {
      color: green;
    }
    .delayed {
      color: limegreen;
      font-style: italic;
    }
    .launched {
      color: orange;
      font-style: italic;
    }
    .aborted {
      color: red;
      font-style: italic;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsComponent {
  launch: LaunchDto = {
    id: '1',
    agencyId: '1',
    rocketId: '1',
    date: new Date(),
    mission: 'Moon Landing',
    destination: 'The Moon',
    pricePerSeat: 1000000,
    status: 'confirmed',
  };

  currentTravelers = 2;
}
