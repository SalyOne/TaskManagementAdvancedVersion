export interface ITask {
  id: string | number;
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
export const TaskPriorityList: ListItem[] = [
  {
    value: 'High',
  },
  {
    value: 'Medium',
  },
  {
    value: 'Low',
  },
];
export const TaskStatusList: ListItem[] = [
  {
    value: 'InProgress',
  },
  {
    value: 'Pending',
  },
  {
    value: 'Completed',
  },
];

export interface ListItem {
  value: string | number;
}
