import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annotations-submit',
  templateUrl: './annotations-submit.component.html',
  styleUrls: ['./annotations-submit.component.css']
})
export class AnnotationsSubmitComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      annotation: ['', Validators.required],
      group: ['misc', Validators.required],
    });
  }

  submitAnnotation() {
    if(this.form.valid){
      console.log(this.form.value);
      // API call here later
    } else {
      console.log('form is not valid');
    }
  }

  markFormGroupTouched() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].markAsDirty();
    });
  }

  back(){
    window.history.back();
  }
}
