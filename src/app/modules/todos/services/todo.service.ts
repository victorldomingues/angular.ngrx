import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo.model';
@Injectable()
export class TodoService {
    /**
     *
     */
    constructor(private http: HttpClient) {


    }

    getTodos$() {
        return this.http.get('https://jsonplaceholder.typicode.com/todos');
    }
    getTodo$(id: number) {
        return this.http.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
    }
    add$(todo: Todo) {
        return this.http.post(`https://jsonplaceholder.typicode.com/todos`, todo);
    }
    update$(id: number, todo: Todo) {
        return this.http.put(`https://jsonplaceholder.typicode.com/todos/${id}`, todo);
    }

    remove$(id: number) {
        return this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    }
}
