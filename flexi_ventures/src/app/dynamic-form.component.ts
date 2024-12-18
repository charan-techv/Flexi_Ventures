import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ConditionService } from './services/condition.service';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit {
  form: FormGroup;
  
  title = 'Forms';
  formDefinition: any[] = [];
  submitted = false;
  groupedFields: { [key: string]: any[] } = {};
  user = {
    orderno: "",
    orderdate: "",
    email: "",
    price: "",
    orderinfo: "",
    Address: "",
    Refurbished: ""
  }
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
      debugger
      this.groupFields();
      this.createForm();
    });
  }

  groupFields() {
    this.formDefinition.forEach((field) => {
      const group = field.group || 'default';
      if (!this.groupedFields[group]) this.groupedFields[group] = [];
      debugger
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
    debugger
    if (!field.condition) return true;
    
    return this.conditionService.evaluateCondition(field, this.form.value);
  }

  onSubmit() {
    if (this.form.valid) {

      this.submitted = true;
      // this.user.orderno = this.form.value.orderno;
      // this.user.orderdate = this.form.value.orderdate;
      // this.user.phoneNumber = this.form.value.phoneNumber;
      // this.user.orderinfo = this.form.value.orderinfo;
      // this.user.Address = this.form.value.Address;
      // this.user.Refurbished = this.form.value.Refurbished;
      this.user = this.form.getRawValue();
      console.log('testttttttttttt99mmmm', this.form.getRawValue());
      this.form.reset();

    } else {
      alert('Form has validation errors.');
    }
  }


}
