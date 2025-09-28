import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, TaskItem } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:5134/api/projects';

  constructor(private http: HttpClient) {}

  // Get all projects
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  // Get single project
  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  // Create new project
  createProject(name: string): Observable<Project> {
    return this.http.post<Project>(
      this.apiUrl,
      { name },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Add task
  addTask(projectId: number, title: string): Observable<TaskItem> {
    return this.http.post<TaskItem>(
      `${this.apiUrl}/${projectId}/tasks`,
      { title },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Toggle task complete
  toggleTask(projectId: number, taskId: number): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${projectId}/tasks/${taskId}/toggle`,
      {}
    );
  }
}
