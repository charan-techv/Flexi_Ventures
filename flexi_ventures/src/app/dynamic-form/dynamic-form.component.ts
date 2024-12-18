import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent {
  public orderForm: FormGroup;
  finalresult:any=''
  disablefield:boolean=false
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      orderNo: ['', Validators.required],
      orderedDate: ['', Validators.required],
      orderedInfo: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      refurbished: ['Yes'],
      address: ['', Validators.required]
    });
  }
    onSubmit(val: { value: any; })
  {
    this.finalresult=val?.value
    debugger
  }
  enterorederNO(event: { key: any; },slval: { value: { orderNo: any; orderedDate: string; }; })
  {
    let val=slval?.value?.orderNo+event.key
    debugger
    if((+val<10 && (slval?.value?.orderedDate!="")) || (+val<20 && slval?.value?.orderedDate==''))
    {
      this.disablefield=true
    }
    else
    {
      this.disablefield=false
    }
  }


}
