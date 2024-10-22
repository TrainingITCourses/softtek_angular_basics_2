import { Pipe, PipeTransform } from '@angular/core';
import { LaunchDto } from '../models/launch.dto';

@Pipe({
  name: 'launchTitle',
  standalone: true,
})
export class LaunchTitlePipe implements PipeTransform {
  transform(value: LaunchDto, ...args: unknown[]): string {
    const innerText = args[0] || ' to ';
    return value.mission + innerText + value.destination;
  }
}
