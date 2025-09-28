export interface TaskItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface Project {
  id: number;
  name: string;
  tasks: TaskItem[];
}
