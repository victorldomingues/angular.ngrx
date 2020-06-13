
import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo.model';

export const loadAll = createAction('[TODO] LOAD TODOS');
export const loadAllSuccess = createAction('[TODO] LOAD TODOS SUCCESS', props<{ todos: Todo[] }>());
export const loadAllFail = createAction('[TODO] LOAD TODOS FAIL');

export const load = createAction('[TODO] LOAD TODO', props<{ id: number }>());
export const loadSuccess = createAction('[TODO] LOAD TODO SUCCESS', props<{ todo: Todo }>());
export const loadFail = createAction('[TODO] LOAD TODO FAIL');

export const complete = createAction('[TODO] COMPLETE TODO0', props<{ id: number }>());
export const completeSuccess = createAction('[TODO] COMPLETE TODO SUCCESS', props<{ id: number }>());
export const completeFail = createAction('[TODO] COMPLETE TODO FAIL');

export const add = createAction('[TODO] ADD TODO', props<Todo>());
export const addSuccess = createAction('[TODO] ADD TODO  SUCCESS', props<Todo>());
export const addFail = createAction('[TODO] ADD TODO FAIL');

export const update = createAction('[TODO] UPDATE TODO', props<{ id: number, todo: Todo }>());
export const updateSuccess = createAction('[TODO] UPDATE TODO  SUCCESS', props<{ id: number, changes: Todo }>());
export const updateFail = createAction('[TODO] UPDATE TODO FAIL');

export const remove = createAction('[TODO] REMOVE TODO', props<{ id: number }>());
export const removeSuccess = createAction('[TODO] REMOVE TODO  SUCCESS', props<{ id: number }>());
export const removeFail = createAction('[TODO] REMOVE TODO FAIL');