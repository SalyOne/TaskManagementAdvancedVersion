import {Component, OnInit} from '@angular/core';
import {
  NzTableComponent,
  NzTableFilterFn,
  NzTableFilterList, NzTableModule,
  NzTableSortFn,
  NzTableSortOrder, NzThAddOnComponent
} from "ng-zorro-antd/table";
import {NgForOf} from "@angular/common";
import {HeaderComponent} from "../../../../shared/components/header/header.component";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {RouterLink} from "@angular/router";
import {LocalService} from "../../../../core/services/local.service";
import {ITask, TaskPriorityList, TaskStatus, TaskStatusList} from "../../../../core/Interfaces/itask";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";


interface ColumnItem {
  name: string;
  // sortOrder: NzTableSortOrder | null;
  // sortFn: NzTableSortFn<DataItem> | null;
  // listOfFilter: NzTableFilterList;
  // filterFn: NzTableFilterFn<DataItem> | null;
  // filterMultiple: boolean;
  // sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NzTableModule,
    NzTableComponent,
    NzThAddOnComponent,
    NgForOf,
    HeaderComponent,
    NzButtonComponent,
    RouterLink,
    NzSelectComponent,
    NzOptionComponent,
    FormsModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})

export class TaskListComponent implements OnInit {
  tasks: ITask[] = [];
  listOfData: ITask[] = this.localService.tasks$();
  priorityOptions$: any = TaskPriorityList;
  statusOptions$: any = TaskStatusList;
  protected readonly priority$ = TaskPriorityList;
  protected readonly event = event;

  constructor(private localService: LocalService) {
  }

  ngOnInit(): void {
    this.loadTasks();
    this.listOfData = this.tasks;
  }

  loadTasks(): void {
    this.tasks = this.localService.getTasks();
    this.listOfData = this.tasks;
    // console.log("List of data", this.listOfData);
  }

  listOfColumns: ColumnItem[] = [
    {
      name: 'title',
    },
    {
      name: 'Description',
    },
    {
      name: 'Status',
    },
    {
      name: 'Priority',
    },
    {
      name: 'Dependency',
    },
    {
      name: 'actions',
    }
  ];

  deleteTask(id: string | number) {
    this.localService.deleteTask(id)
    this.loadTasks()
  }

  resetTask() {
    this.localService.clearTasks()
  }

  updateTask(task: ITask) {
    this.localService.updateTask(task)
    this.loadTasks()
  }

  onStatusChange(taskId: number | string, newStatus: any) {
    const updatedTask = {...this.localService.getTaskById(taskId), status: newStatus};
    if (updatedTask) {
      this.localService.updateTask(updatedTask);
    }
  }

  onPriorityChange(taskId: number | string, newStatus: any) {
    const updatedTask = {...this.localService.getTaskById(taskId), priority: newStatus};

    if (updatedTask) {
      this.localService.updateTask(updatedTask);
    }

  }

  canChangeStatus(id: string | number): boolean {
   return this.localService.isTaskStatusDisabled(id)
  }

  //TODO make add-task a modal
  isItself(dataId: string | number, taskId: string | number) {
    return !this.localService.canAddDependency(dataId, taskId)
  }

  getTasks() {
    return this.localService.tasks$();
  }
}

