import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appStatusDelete]',
  standalone: true
})
export class StatusDelete {

  @Input('appStatusDelete') taskTitle= '';
  @Output() confirmDelete = new EventEmitter<void>();

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const confirmed = confirm(`¿Desea eliminar la tarea ${this.taskTitle}?`);

    if (confirmed) {
      this.confirmDelete.emit();
    }
  }
}