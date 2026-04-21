import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appStatusTask]',
  standalone: true
})
export class StatusTask {
  @HostBinding('style.backgroundColor') backgroundColor = '';

  @Input() set appStatusTask(completed: boolean) {
    this.backgroundColor = completed ? '' : 'red';
  }
}