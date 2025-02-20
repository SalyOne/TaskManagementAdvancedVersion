import {Component, inject} from '@angular/core';
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent, NzFormModule} from "ng-zorro-antd/form";
import {NzColDirective} from "ng-zorro-antd/grid";
import {NzInputDirective, NzTextareaCountComponent} from "ng-zorro-antd/input";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzOptionComponent, NzSelectComponent, NzSelectModule} from "ng-zorro-antd/select";
import {TaskPriorityList} from "../../../../core/Interfaces/itask";
import {NgClass, NgForOf} from "@angular/common";
import {LocalService} from "../../../../core/services/local.service";
import {NzModalRef} from "ng-zorro-antd/modal";

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
    NgForOf,
    NgClass
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent{

  private localService = inject(LocalService);
  private modalRef = inject(NzModalRef);

  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    status: new FormControl("Pending", Validators.required),
    priority: new FormControl(null, Validators.required),
    // dependencies: new FormControl(null, Validators.required),
  });
  priority$: any= TaskPriorityList;
  isFilled = false

  submitForm(): void {
    if (this.form.invalid) {
      this.isFilled = true;
      return;
    }
    this.isFilled = false;
    this.localService.addTask(this.form.value)
    this.modalRef.close('Submitted!')
    console.log('submit', this.form.value);
  }
}
