import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { TodosComponent } from './todo/todos.component';
import { RouterModule, Routes } from '@angular/router';
import { todoReducer } from './state/todo.reducer';
import { TodoService } from './services/todo.service';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './state/todo.effects';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
const COMPONENTS = [TodosComponent];
const routes: Routes = [
  { path: '', component: TodosComponent }
];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    StoreModule.forFeature('todos', todoReducer),
    EffectsModule.forFeature([TodoEffects]),
    EffectsModule.forRoot([]),
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [TodoService]
})
export class TodosModule { }
