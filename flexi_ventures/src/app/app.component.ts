import { Component } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DynamicFormComponent],
  template: `
    <div>
      <h1>Dynamic Form Builder</h1>
      <app-dynamic-form></app-dynamic-form>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: any;
}
