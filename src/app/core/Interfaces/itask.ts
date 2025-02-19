export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dependency: string[];

}
export enum TaskStatus {
  InProgress = 'In progress',
  Pending = 'Pending',
  Completed = 'Completed'
}
export enum TaskPriority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low'
}
