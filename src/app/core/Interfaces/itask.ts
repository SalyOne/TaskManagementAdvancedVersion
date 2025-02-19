export interface ITask {
  id: string | number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dependency: (string|number)[];

}
export type TaskPriority = 'High' | 'Medium' | 'Low';

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

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

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
