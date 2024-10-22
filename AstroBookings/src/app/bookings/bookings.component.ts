import { CurrencyPipe, DatePipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { LaunchDto } from '../models/launch.dto';
import { RocketDto } from '../models/rocket.dto';
import { LaunchTitlePipe } from './launch-title.pipe';

@Component({
  selector: 'lab-bookings',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UpperCasePipe, CurrencyPipe, DatePipe, DecimalPipe, LaunchTitlePipe],
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
        <p>Rocket Capacity: {{ rocket.capacity }}</p>
        <p>Current Travelers: {{ currentTravelers() }}</p>
        <label for="newTravelers">New Travelers:</label>
        <input
          id="newTravelers"
          type="number"
          min="0"
          [max]="maxNewTravelers()"
          [value]="newTravelers()"
          (change)="onNewTravelersChange($event)" />
        <p>Total travelers: {{ totalTravelers() }}</p>
      </main>
      <footer>
        <button (click)="onBookClick()">Book now!</button>
        <button (click)="onCancelClick()">Cancel</button>
      </footer>
    </article>
  `,
})
export class BookingsComponent {
  launch: LaunchDto = {
    id: 'lnch_1',
    agencyId: 'usr_a1',
    rocketId: 'rkt_1',
    date: '2025-07-20T10:00:00Z',
    mission: 'Artemis I',
    destination: 'Moon Orbit',
    pricePerSeat: 28000000,
    status: 'delayed',
  };
  rocket: RocketDto = {
    id: 'rkt_1',
    agencyId: 'usr_a1',
    name: 'Falcon Heavy',
    capacity: 100,
    range: 'mars',
  };

  currentTravelers: Signal<number> = signal(89);
  newTravelers: WritableSignal<number> = signal(0);
  totalTravelers: Signal<number> = computed(() => this.currentTravelers() + this.newTravelers());
  maxNewTravelers: Signal<number> = computed(() => this.rocket.capacity - this.currentTravelers());

  private readonly launchStatusEffect = effect(() => {
    const occupation = this.totalTravelers() / this.rocket.capacity;
    if (occupation > 0.9) {
      this.launch.status = 'confirmed';
    } else {
      this.launch.status = 'delayed';
    }
  });

  onNewTravelersChange(event: Event) {
    const max = this.maxNewTravelers();
    const newTravelers = (event.target as HTMLInputElement).valueAsNumber;
    this.newTravelers.set(Math.min(newTravelers, max));
    //console.log('New travelers:', this.newTravelers());
  }

  onBookClick() {
    // this.newTravelers.update((v) => v + 1);
  }

  onCancelClick() {
    this.newTravelers.set(0);
  }
}
