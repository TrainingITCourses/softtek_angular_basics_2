import { CurrencyPipe, DatePipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { LaunchDto } from '../models/launch.dto';
import { LaunchTitlePipe } from './launch-title.pipe';

@Component({
  selector: 'lab-launch-header',
  standalone: true,
  imports: [UpperCasePipe, CurrencyPipe, DatePipe, DecimalPipe, LaunchTitlePipe],
  template: `
    <header>
      <h2>{{ launch() | launchTitle : ' 🧑‍🚀 ' }}</h2>
      <div [class]="launch().status">
        <span>{{ launch().pricePerSeat | currency : 'USD' : 'symbol' : '1.0-0' }}</span>
        <span>{{ launch().date | date : 'dd MMM yyyy' }}</span>
        <span>{{ launch().status | uppercase }}</span>
      </div>
    </header>
  `,
  styles: `.scheduled {
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
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchHeaderComponent {
  launch: InputSignal<LaunchDto> = input.required<LaunchDto>();
}