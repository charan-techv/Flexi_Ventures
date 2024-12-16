import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ConditionService } from './services/condition.service';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], // Add HttpClientModule here
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div *ngFor="let group of groupedFields | keyvalue">
        <h3>{{ group.key }}</h3>
        <div *ngFor="let field of group.value">
          <div *ngIf="isFieldVisible(field)">
            <label>
              {{ field.name }} <span *ngIf="field.validator?.includes('required')">*</span>
            </label>
            <input
              *ngIf="field.fieldtype === 'text'"
              [formControlName]="field.name"
              type="text"
            />
            <input
              *ngIf="field.fieldtype === 'date'"
              [formControlName]="field.name"
              type="date"
            />
            <input
              *ngIf="field.fieldtype === 'integer'"
              [formControlName]="field.name"
              type="number"
            />
            <select
              *ngIf="field.fieldtype === 'boolean'"
              [formControlName]="field.name"
            >
              <option *ngFor="let option of field.selectList">{{ option }}</option>
            </select>
          </div>
        </div>
      </div>
      <button type="submit">Save</button>
    </form>
  `,
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit {
  form: FormGroup;
  formDefinition: any[] = [];
  groupedFields: { [key: string]: any[] } = {};

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private conditionService: ConditionService
  ) {
    this.form = this.fb.group({});
  }
  
  ngOnInit() {
    this.http.get<any[]>('/form-definition.json').subscribe((data) => {
      this.formDefinition = data;
      this.groupFields();
      this.createForm();
    });
  }

  groupFields() {
    this.formDefinition.forEach((field) => {
      const group = field.group || 'default';
      if (!this.groupedFields[group]) this.groupedFields[group] = [];
      this.groupedFields[group].push(field);
    });
  }

  createForm() {
    this.formDefinition.forEach((field) => {
      const validators = this.getValidators(field);
      this.form.addControl(field.name, this.fb.control('', validators));
    });
  }

  getValidators(field: any) {
    const validators = [];
    if (field.validator?.includes('required')) {
      validators.push(Validators.required);
    }
    return validators;
  }

  isFieldVisible(field: any): boolean {
    if (!field.condition) return true;
    return this.conditionService.evaluateCondition(field, this.form.value);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('testttttttttttt99mmmm', this.form.getRawValue());
    } else {
      alert('Form has validation errors.');
    }
  }
}
