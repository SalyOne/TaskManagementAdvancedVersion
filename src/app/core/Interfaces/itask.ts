export interface ITask {
  id: string | number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dependency: (string | number)[];

}

export type TaskPriority = 'High' | 'Medium' | 'Low';

export const TaskPriorityList: ListItem[] = [
  {
    value: 'High',
    label: 'High მაღალი'
  },
  {
    value: 'Medium',
    label: 'Medium'
  },
  {
    value: 'Low',
    label: 'Low'
  },
];

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export const TaskStatusList: ListItem[] = [

  {
    value: 'Pending',
    label: 'Pending'
  }, {
    value: 'InProgress',
    label: 'In progress'
  },
  {
    value: 'Completed',
    label: 'Completed'
  },
];

export interface ListItem {
  value: string | number;
  label: string ;
}
