import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable()
export class TodoService {
  anotherTodolist: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }

  // GET all
  fetchTodolist() {
    this.anotherTodolist = this.firebase.list('tasks');
    return this.anotherTodolist;
  }

  // PUT tak
  addTask(taskTitle: string) {
    this.anotherTodolist.push({
      title: taskTitle,
      isChecked: false
    });
  }

  // UPDATE task state
  checkedToggle($key: string, flag: boolean) {
    this.anotherTodolist.update($key, { isChecked: flag });
  }

  // DELETE task
  removeTask($key: string) {
    this.anotherTodolist.remove($key);

  }




}
