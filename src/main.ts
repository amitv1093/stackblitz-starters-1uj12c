import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';

// Custom validator function
function customValidator(control: AbstractControl) {
  const value = control.value;

  console.log(value);

  if (value && !value.includes('example')) {
    return { invalidValue: true }; // Return error object if validation fails
  }
  return null; // Return null if validation passes
}

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h1>Hello from {{name}}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular 
    </a>
    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
  <label for="firstName">First Name:</label>
  <input type="text" id="firstName" formControlName="firstName">
  
  <div *ngIf="myForm.get('firstName')?.invalid && myForm.get('firstName')?.touched">
    <div *ngIf="myForm.get('firstName')?.errors?.required">First name is required.</div>
    <div *ngIf="myForm.get('firstName')?.errors?.invalidValue">Invalid value for first name.</div>
  </div>
  

  <label for="lastName">Last Name:</label>
  <input type="text" id="lastName" formControlName="lastName">
  
  <label for="email">Email:</label>
  <input type="email" id="email" formControlName="email">
  
  <label for="password">Password:</label>
  <input type="password" id="password" formControlName="password">
  
  <button type="submit">Submit</button>
</form>
  `,
})
export class App {
  name = 'Angular';

  myForm: FormGroup;

  constructor() {
    this.myForm = new FormGroup({
      firstName: new FormControl('', [customValidator]),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
  }
}

bootstrapApplication(App);
