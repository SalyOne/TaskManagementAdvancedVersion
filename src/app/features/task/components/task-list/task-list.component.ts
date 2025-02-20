import {Component, inject, OnInit} from '@angular/core';
import {
  NzTableComponent,
  NzTableFilterFn,
  NzTableFilterList, NzTableModule,
  NzTableSortFn,
  NzTableSortOrder, NzThAddOnComponent
} from "ng-zorro-antd/table";
import {NgForOf, NgIf} from "@angular/common";
import {HeaderComponent} from "../../../../shared/components/header/header.component";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {RouterLink} from "@angular/router";
import {LocalService} from "../../../../core/services/local.service";
import {ITask, TaskPriorityList, TaskStatus, TaskStatusList} from "../../../../core/Interfaces/itask";
import {NzOptionComponent, NzSelectComponent, NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";


interface ColumnItem {
  name: string;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NzTableModule,
    NzTableComponent,
    NzSelectModule,
    NgForOf,
    HeaderComponent,
    NzButtonComponent,
    RouterLink,
    NzSelectComponent,
    NzOptionComponent,
    FormsModule,
    NgIf,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})

export class TaskListComponent implements OnInit {
  private localService = inject(LocalService);
  listOfData: ITask[] = this.localService.tasks$();
  filteredData: ITask[] = [];

  priorityOptions$: any = TaskPriorityList;
  statusOptions$: any = TaskStatusList;

  selectedStatus: string | null = null;
  selectedPriority: string | null = null;

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

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.listOfData = this.localService.getTasks();
    this.filteredData = this.listOfData;
  }


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

  isItself(dataId: string | number, taskId: string | number) {
    return !this.localService.canAddDependency(dataId, taskId)
  }


// filter stuff
  onPriorityChange(taskId: number | string, newStatus: any) {
    const updatedTask = {...this.localService.getTaskById(taskId), priority: newStatus};

    if (updatedTask) {
      this.localService.updateTask(updatedTask);
    }

  }

  canChangeStatus(id: string | number): boolean {
    return this.localService.isTaskStatusDisabled(id)
  }

  filterTasks(): void {
    this.filteredData = this.listOfData.filter(task => {
      return (!this.selectedStatus || task.status === this.selectedStatus) &&
        (!this.selectedPriority || task.priority === this.selectedPriority);
    });
  }

  onStatusFilterChange(value: string | null): void {
    this.selectedStatus = value;
    this.filterTasks();
  }

  onPriorityFilterChange(value: string | null): void {
    this.selectedPriority = value;
    this.filterTasks();
  }


  //TODO make add-task a modal


}

