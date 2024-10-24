import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import LAUNCHES_DB from '../../../../db/launches.json';
import { LaunchDto, NULL_LAUNCH } from '../../../shared/models/launch.dto';
import { RocketDto } from '../../../shared/models/rocket.dto';
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
export default class BookingsPage {
  // property data
  launch: WritableSignal<LaunchDto> = signal<LaunchDto>(NULL_LAUNCH);
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

  constructor(activateRoute: ActivatedRoute) {
    const launchId: string = activateRoute.snapshot.params['id'] || '';
    const launchFound = LAUNCHES_DB.find((launch) => launch.id === launchId);
    if (launchFound) {
      this.launch.set(launchFound);
    }
  }

  // Methods (event handlers)
  onBookTravel(newTravelers = 0) {
    console.log('Booked travelers:', newTravelers);
    this.newTravelers.set(newTravelers);
  }
}
