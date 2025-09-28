import { Component } from '@angular/core';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProjectListComponent, ProjectDetailComponent],
  template: `
    <h1>Task Manager</h1>
    <div style="display: flex; gap: 2rem;">
      <app-project-list
        (selectProject)="selectedProjectId = $event"
      ></app-project-list>

      @if (selectedProjectId) {
      <app-project-detail [projectId]="selectedProjectId"></app-project-detail>
      }
    </div>
  `,
})
export class AppComponent {
  selectedProjectId?: number;
}
