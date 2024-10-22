import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  output,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { RocketDto } from '../models/rocket.dto';

@Component({
  selector: 'lab-book-form',
  standalone: true,
  imports: [],
  template: `
    <main>
      <p>Rocket Capacity: {{ rocket().capacity }}</p>
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
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookFormComponent {
  rocket: InputSignal<RocketDto> = input.required<RocketDto>();
  currentTravelers: InputSignal<number> = input.required<number>();
  bookTravel = output<number>();

  newTravelers: WritableSignal<number> = signal(0);
  totalTravelers: Signal<number> = computed(() => this.currentTravelers() + this.newTravelers());
  maxNewTravelers: Signal<number> = computed(
    () => this.rocket().capacity - this.currentTravelers(),
  );

  onNewTravelersChange(event: Event) {
    const max = this.maxNewTravelers();
    const newTravelers = (event.target as HTMLInputElement).valueAsNumber;
    this.newTravelers.set(Math.min(newTravelers, max));
    //console.log('New travelers:', this.newTravelers());
  }
  onBookClick() {
    console.log('Booked travelers:', this.newTravelers());
    this.bookTravel.emit(this.newTravelers());
  }

  onCancelClick() {
    this.newTravelers.set(0);
  }
}