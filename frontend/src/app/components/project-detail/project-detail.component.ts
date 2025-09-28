import { Component, effect, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { TaskItem } from '../../models/project';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent {
  projectId = input.required<number>();
  tasks = signal<TaskItem[]>([]);
  newTaskTitle = new FormControl('');

  constructor(private projectService: ProjectService) {
    effect(() => {
      const id = this.projectId();
      if (!id) return;
      this.loadProject(id);
    });
  }

  private loadProject(id: number) {
    this.projectService
      .getProject(id)
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((p) => this.tasks.set(p.tasks));
  }

  addTask() {
    const title = this.newTaskTitle.value?.trim();
    if (!title) return;

    this.projectService
      .addTask(this.projectId(), title)
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe(() => {
        this.newTaskTitle.reset();
        this.loadProject(this.projectId());
      });
  }

  toggleTask(task: TaskItem) {
    this.projectService
      .toggleTask(this.projectId(), task.id)
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe(() => this.loadProject(this.projectId()));
  }
}
