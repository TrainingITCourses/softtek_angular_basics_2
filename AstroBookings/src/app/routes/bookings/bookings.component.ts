import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';

import { LaunchDto } from '../../models/launch.dto';
import { RocketDto } from '../../models/rocket.dto';
import { BookFormComponent } from './book-form.component';
import { LaunchHeaderComponent } from './launch-header.component';

/**
 * Bookings page componente
 * Display the launch details and the booking form
 */
@Component({
  selector: 'lab-bookings',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LaunchHeaderComponent, BookFormComponent],
  template: `
    <article>
      <lab-launch-header [launch]="launch()" />
      <lab-book-form
        [rocket]="rocket"
        [currentTravelers]="currentTravelers()"
        (bookTravel)="onBookTravel($event)" />
    </article>
  `,
})
export default class BookingsComponent {
  // property data
  launch: WritableSignal<LaunchDto> = signal<LaunchDto>({
    id: 'lnch_1',
    agencyId: 'usr_a1',
    rocketId: 'rkt_1',
    date: '2025-07-20T10:00:00Z',
    mission: 'Artemis I',
    destination: 'Moon Orbit',
    pricePerSeat: 28000000,
    status: 'delayed',
  });
  rocket: RocketDto = {
    id: 'rkt_1',
    agencyId: 'usr_a1',
    name: 'Falcon Heavy',
    capacity: 100,
    range: 'mars',
  };

  // Readonly signals
  currentTravelers: Signal<number> = signal(89);

  // Writable signals
  newTravelers: WritableSignal<number> = signal(0);

  // Computed signals
  totalTravelers: Signal<number> = computed(() => this.currentTravelers() + this.newTravelers());

  // Effects (run on signals changes)
  private readonly launchStatusEffect = effect(
    () => {
      const occupation = this.totalTravelers() / this.rocket.capacity;
      if (occupation > 0.9) {
        this.launch.update((launch) => ({ ...launch, status: 'confirmed' }));
      } else {
        this.launch.update((launch) => ({ ...launch, status: 'scheduled' }));
      }
      console.log('Launch status:', this.launch().status);
    },
    {
      allowSignalWrites: true,
    },
  );

  // Methods (event handlers)
  onBookTravel(newTravelers = 0) {
    console.log('Booked travelers:', newTravelers);
    this.newTravelers.set(newTravelers);
  }
}