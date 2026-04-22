import { Component, inject, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators, NgForm } from "@angular/forms";
import { NgClass, NgStyle } from "@angular/common";
import { Task } from "../../models/task.interface";
import { StatusTask } from "../../directives/status-task.directive";
import { StatusDelete } from "../../directives/status-delete.directive";
import { CreateTaskDirective } from "../../directives/create-task.directive";



@Component({

    selector: "app-add-task",
    styleUrl: './add.component.scss',
    templateUrl: './add.component.html',
    imports: [ReactiveFormsModule, NgClass, NgStyle, StatusTask, StatusDelete, CreateTaskDirective],
    standalone : true



})

export class AddComponent implements OnInit{

    numbTask!: number;
    titleTask = ""
    activeButton = true
    isActive = true
    tasks: Task[] = [
        {
        id: 1,
        title: "Tarea 1",
        completed: false},
            {
                id: 2,
                title: "Tarea 2",
                completed: false},
                {
                    id: 3,
                    title: "Tarea 3",
                    completed: false}

    ]

    fb = inject(FormBuilder);

    form! :FormGroup;


    ngOnInit(): void {
        this.form = this.fb.group({
            title: new FormControl("", [Validators.required, Validators.maxLength(8)])
          })
          // Inicializa el contador con las tareas precargadas.
          this.numbTask = this.tasks.length;
    }

    sendTitleTask(){
        // Este flujo cubre el envío con Enter (ngSubmit del formulario).
        if (this.form.invalid) {
            return;
        }

        const titleValue = this.form.get("title")?.value ?? "";
        const title = String(titleValue).trim();

        if (!title) {
            return;
        }

        // Reusa el mismo punto de alta para no duplicar lógica.
        this.onTaskCreated({
            id: this.getNextId(),
            title,
            completed: false
        });
    }

    getNextId(): number {
        // Evita ids repetidos aunque se eliminen tareas intermedias.
        if (this.tasks.length === 0) {
            return 1;
        }

        return Math.max(...this.tasks.map((task) => task.id)) + 1;
    }

    onTaskCreated(task: Task) {
            // Alta única de tarea: agrega, actualiza contador y limpia input.
      this.tasks.push(task);
      this.numbTask = this.tasks.length;
      this.form.reset({ title: '' });
    }

    markTaskCompleted(task: Task, event: Event) {
        const input = event.target as HTMLInputElement;
        task.completed = input.checked;

    }


    delete(id: number){
        this.tasks = this.tasks.filter((task)=> task.id !==id)
        this.numbTask = this.tasks.length;
    }













    sendData(form: NgForm){
        if(form.valid){
            console.log("Tarea enviada ${titleTask}")
        }

    }

    sendTask(){
        const arrayTitleTask = this.titleTask.split("")
            if(arrayTitleTask.length >0){
                this.activeButton= true
            }else{
                this.activeButton = false
            }
        }
    }
