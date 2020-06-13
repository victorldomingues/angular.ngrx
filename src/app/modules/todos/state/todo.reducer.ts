import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';

import { Todo } from '../models/todo.model';
import * as app from './app.state';
import * as actions from './todo.actions';

export interface TodoState extends EntityState<Todo> {
    loading: boolean;
    selectId: number | null;
}

export interface AppState extends app.AppState {
    todos: TodoState;
}

export const defaultTodo: TodoState = {
    selectId: null,
    ids: [],
    entities: {},
    loading: false
};

export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
    selectId: e => e.id
});

export const initialState = todoAdapter.getInitialState(defaultTodo);

const _todoReducer = createReducer(initialState,

    on(actions.loadAllSuccess, (state, { todos }) => (
        todoAdapter.addMany(todos, { ...state, selectedTodoId: null, loading: false })
    )),
    on(actions.loadSuccess, (state, { todo }) => (
        todoAdapter.addOne(todo, { ...state, selectedTodoId: todo.id })
    )),
    on(actions.addSuccess, (state, todo) => (
        todoAdapter.upsertOne({ ...todo, id: state.ids.length + 1 }, state)
    )),
    on(actions.updateSuccess, (state, todo) => (
        todoAdapter.updateOne(todo, state)
    )),
    on(actions.removeSuccess, (state, todo) => (
        todoAdapter.removeOne(todo.id, state)
    ))
);

export function todoReducer(state = initialState, action) {
    return _todoReducer(state, action);
}

const getTodoFeatureState = createFeatureSelector<TodoState>(
    'todos'
);

export const getTodos = createSelector(getTodoFeatureState,
    todoAdapter.getSelectors().selectAll);

export const getCurrentTodoId = createSelector(getTodoFeatureState,
    state => state.selectId);

export const getTodo = createSelector(getTodoFeatureState,
    state => state.entities[state.selectId]);

export const getNotCompletedTodos = createSelector(getTodoFeatureState,
    (state) => todoAdapter.getSelectors().selectAll(state).filter(x => !x.completed));

export const getCompletedTodos = createSelector(getTodoFeatureState,
    (state) => todoAdapter.getSelectors().selectAll(state).filter(x => !x.completed));
