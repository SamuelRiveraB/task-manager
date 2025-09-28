import { Component, OnInit, signal, output } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent implements OnInit {
  projects = signal<Project[]>([]);
  newProjectName = new FormControl('');

  selectProject = output<number>();

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService
      .getProjects()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((data) => this.projects.set(data));
  }

  addProject() {
    const name = this.newProjectName.value?.trim();
    if (!name) return;
    this.projectService
      .createProject(name)
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe(() => {
        this.newProjectName.reset();
        this.loadProjects();
      });
  }

  chooseProject(id: number) {
    this.selectProject.emit(id);
  }
}
