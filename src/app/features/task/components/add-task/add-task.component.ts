import {Component, OnInit} from '@angular/core';
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent, NzFormModule} from "ng-zorro-antd/form";
import {NzColDirective} from "ng-zorro-antd/grid";
import {NzInputDirective, NzTextareaCountComponent} from "ng-zorro-antd/input";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzOptionComponent, NzSelectComponent, NzSelectModule} from "ng-zorro-antd/select";
import {TaskPriority, TaskPriorityList, TaskStatusList} from "../../../../core/Interfaces/itask";
import {NgForOf} from "@angular/common";
import {LocalService} from "../../../../core/services/local.service";

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    NzFormModule,
    NzSelectModule,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzColDirective,
    NzInputDirective,
    ReactiveFormsModule,
    FormsModule,
    NzTextareaCountComponent,
    NzButtonComponent,
    NzSelectComponent,
    NzOptionComponent,
    NgForOf
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    status: new FormControl("Pending", Validators.required),
    priority: new FormControl(null, Validators.required),
    // dependencies: new FormControl(null, Validators.required),
  });
  priority$: any= TaskPriorityList;
  status$: any= TaskStatusList;

  constructor(private localService:  LocalService) {
  }

  ngOnInit(): void {
    // this.loadTasks();
  }
  submitForm(): void {
    if (this.form.invalid) {
      console.log('error', this.form.value);
      return;
    }
    this.localService.addTask(this.form.value)
    console.log('submit', this.form.value);
  }
}
