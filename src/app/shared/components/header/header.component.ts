import { Component } from '@angular/core';
import {NzHeaderComponent} from "ng-zorro-antd/layout";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NzHeaderComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
