import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  private todoList: Todo[] = [
    {
      id: this.todoId++,
      title: 'serve the app',
      completed: true,
    },
    {
      id: this.todoId++,
      title: 'familiarise yourself with the codebase',
      completed: false,
    },
    {
      id: this.todoId++,
      title: 'start talking to the api',
      completed: false,
    },
  ];

  http = inject(HttpClient)

  getTodoList() {
    return this.http.get<Todo[]>(`${environment.apiUrl}/todo`)
  }

  todos: Promise<Todo[]> = Promise.resolve(this.todoList);

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };

    const result = await firstValueFrom(this.http.post<Todo>(`${environment.apiUrl}/todo`, todo));
    return result;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const foundTodo = await firstValueFrom(this.http.get<Todo>(`${environment.apiUrl}/todo/${updatedTodo.id}`))

    foundTodo.completed = !foundTodo.completed
    const result = await firstValueFrom(this.http.put<Todo>(`${environment.apiUrl}/todo/${updatedTodo.id}`, foundTodo))
    return result
  }
}
