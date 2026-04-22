import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Task } from '../models/task.interface';

@Directive({
selector: '[appCreateTask]',
standalone: true
})
export class CreateTaskDirective
{
  // Recibe el FormGroup para validar y leer el campo title.
  @Input('appCreateTask') form!: FormGroup;
  // Recibe el siguiente id calculado por el componente.
  @Input() nextId = 1;
  // Emite la tarea lista para que el componente la agregue al arreglo.
  @Output() taskCreated = new EventEmitter<Task>();

  @HostListener('click', ['$event'])
    onClick(event: Event) {
    // Evita el submit nativo; este camino maneja la creación por click.
    event.preventDefault();
    event.stopPropagation();

    // Si el formulario no es válido, no se crea tarea.
    if (!this.form || this.form.invalid) {
      return;
    }

    const titleValue = this.form.get('title')?.value ?? '';
    const title = String(titleValue).trim();

    if (!title) {
      return;
    }

    // Envía al componente una tarea tipada y lista para alta.
    this.taskCreated.emit({
      id: this.nextId,
      title,
      completed: false
    });
    }
}
