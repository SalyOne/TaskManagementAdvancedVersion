import {Routes} from "@angular/router";
import {TaskListComponent} from "./components/task-list/task-list.component";
import {AddTaskComponent} from "./components/add-task/add-task.component";

export const TaskRoutes: Routes = [{
  path: '',
  redirectTo: '',
  pathMatch: 'full'
}, {
  path: '',
  component: TaskListComponent
},
//   {
//   path: 'add',
//   component: AddTaskComponent
// }
];
