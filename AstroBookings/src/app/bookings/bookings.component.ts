import { CurrencyPipe, DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LaunchDto } from '../models/launch.dto';

@Component({
  selector: 'lab-bookings',
  standalone: true,
  imports: [JsonPipe, UpperCasePipe, CurrencyPipe, DatePipe],
  template: `
    <article>
      <header>
        <h2>{{ launch.mission }} {{ launch.destination }}</h2>
        <div [class]="launch.status">
          <span>{{ launch.pricePerSeat | currency : 'USD' : 'symbol' : '1.0-0' }}</span>
          <span>{{ launch.date | date : 'dd/MM/yyyy' }}</span>
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
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsComponent {
  launch: LaunchDto = {
    id: '1',
    agencyId: '1',
    rocketId: '1',
    date: new Date(),
    mission: 'Mission',
    destination: 'Destination',
    pricePerSeat: 1000,
    status: 'scheduled',
  };

  currentTravelers = 2;
}
