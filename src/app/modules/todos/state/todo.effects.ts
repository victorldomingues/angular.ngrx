import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as actions from './todo.actions';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';

@Injectable()
export class TodoEffects {
    constructor(
        private actions$: Actions,
        private service: TodoService) {
    }
    loadAll = createEffect(() => this.actions$.pipe(
        ofType(actions.loadAll),
        mergeMap(() => this.service.getTodos$()
            .pipe(
                map((todos: Todo[]) => (actions.loadAllSuccess({ todos }))),
                catchError(() => EMPTY)
            ))
    )
    );
    load$ = createEffect(() => this.actions$.pipe(
        ofType(actions.load),
        mergeMap((payload) => this.service.getTodo$(payload.id)
            .pipe(
                map((todo: Todo) => (actions.loadSuccess({ todo }))),
                catchError(() => EMPTY)
            ))
    )
    );
    add$ = createEffect(() => this.actions$.pipe(
        ofType(actions.add),
        mergeMap((payload) => this.service.add$(payload)
            .pipe(
                map((todo: Todo) => (actions.addSuccess(todo))),
                catchError(() => EMPTY)
            ))
    )
    );
    update$ = createEffect(() => this.actions$.pipe(
        ofType(actions.update),
        mergeMap((payload) => this.service.update$(payload.id, payload.todo)
            .pipe(
                map((todo: Todo) => (actions.updateSuccess({ id: payload.id, changes: todo }))),
                catchError(() => EMPTY)
            ))
    )
    );
    remove$ = createEffect(() => this.actions$.pipe(
        ofType(actions.remove),
        mergeMap((payload) => this.service.remove$(payload.id)
            .pipe(
                map(() => (actions.removeSuccess({ id: payload.id }))),
                catchError(() => EMPTY)
            ))
    )
    );
}
