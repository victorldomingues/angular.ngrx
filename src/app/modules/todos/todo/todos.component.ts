import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as actions from '../state/todo.actions';
import * as todoReducer from '../state/todo.reducer';
import { Todo } from '../models/todo.model';
import { TodoState } from '../state/todo.reducer';
import { Subscription, Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.less']
})
export class TodosComponent implements OnInit, OnDestroy {

  title: string;
  todos$: Observable<Todo[]>;
  sb: Subscription;

  constructor(private store: Store<todoReducer.AppState>) {
  }

  add() {
    const todo = {
      title: this.title
    } as Todo;
    console.log(this.title, todo);
    this.store.dispatch(actions.add(todo));
    this.title = '';
  }
  remove(id: number) {
    this.store.dispatch(actions.remove({ id }));
  }

  complete(id: number, event) {
    this.store.dispatch(actions.complete({ id }));
  }

  ngOnInit(): void {
    this.store.dispatch(actions.loadAll());
    this.todos$ = this.store.pipe(select(todoReducer.getTodos));
  }

  ngOnDestroy(): void {
    // this.sb.unsubscribe();
  }


}
