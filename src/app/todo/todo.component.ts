import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  todolistArray: any[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    // observable to array
    this.todoService.fetchTodolist().snapshotChanges()
      .subscribe(
        response => {
          this.todolistArray = [];
          response.forEach(task => {
            const newArray = task.payload.toJSON();
            newArray['$key'] = task.key;
            this.todolistArray.push(newArray);
          });

          // sort array
          this.todolistArray.sort((a, b) => {
            return a.isChecked - b.isChecked;
          });

        });
  }

  onAdd(htmlInputElementTask) {

    this.todoService.addTask(htmlInputElementTask.value);
    htmlInputElementTask.value = null;

  }

  onCheck($key: string, isChecked) {
    this.todoService.checkedToggle($key, !isChecked);
  }

  onDelete($key: string) {
    this.todoService.removeTask($key);
  }

}
