import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  url = 'http://localhost:5136/api/tasks';
  
  constructor(private http: HttpClient) { }

  GetAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  GetById(taskId: number): Observable<Task> {
    const apiUrl = `${this.url}/${taskId}`;
    return this.http.get<Task>(apiUrl);
  }

  SaveTask(task: Task) : Observable<any> {
    return this.http.post<Task>(this.url, task, httpOptions);
  }

  UpdateTask(task: Task) : Observable<any> {
    return this.http.put<Task>(this.url, task, httpOptions);
  }

  DeleteTask(taskId: number) : Observable<any> {
    const apiUrl = `${this.url}/${taskId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
