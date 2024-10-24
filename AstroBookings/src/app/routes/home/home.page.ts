import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lab-home',
  standalone: true,
  imports: [],
  template: ` <p>home works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {}
