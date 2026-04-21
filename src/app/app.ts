import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddComponent} from './component/addTask/add.component';
import { ListTask } from "./component/list-task/list-task";






@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AddComponent, ListTask],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
 
  protected readonly title = signal('proyecto_1');
}