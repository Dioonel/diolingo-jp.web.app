import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from './../../../app/services/data.service';

@Component({
  selector: 'app-word-submit',
  templateUrl: './word-submit.component.html',
  styleUrls: ['./word-submit.component.css']
})
export class WordSubmitComponent implements OnInit {

  form!: FormGroup;
  status: 'init' | 'loading' | 'success' | 'error' = 'init';
  errorInfo: string = '';

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.buildForm();
    // update DOM changes
    setTimeout(() => {
      this.form.controls['word'].markAsTouched();
    }, 0);
  }

  private buildForm() {
    this.form = this.fb.group({
      word: ['', [Validators.required, Validators.maxLength(64), Validators.pattern(/[\ぁ-んァ-ン一-龠]/)]],
      meaning: this.fb.array([this.fb.control('', [Validators.required, Validators.maxLength(64)])]),
      pronunciation: this.fb.array([this.fb.control('', [Validators.required, Validators.maxLength(64), Validators.pattern(/[\ぁ-んァ-ン]/)])]),
      notes: []
      //category: ['other', Validators.required],
    });
  }

  submitWord() {
    this.status = 'loading';
    if(this.form.valid){
      console.log(this.form.value);
      this.dataService.createWord(this.form.value).subscribe({
        next: (data) => {
          console.log(data);
          this.resetForm();
          this.status = 'success';
        },
        error: (err) => {
          console.log(err);
          this.status = 'error';
          this.errorInfo = err.error;
        }
      })
    } else {
      console.log('form is not valid');
      this.status = 'error';
    }
  }

  get meaningFormArray() {
    return this.form.get('meaning') as FormArray;
  }

  get pronunciationFormArray() {
    return this.form.get('pronunciation') as FormArray;
  }

  addArrayEl(array: FormArray, flag: boolean = false) {
    if(flag){
      array.push(this.fb.control('', [Validators.required, Validators.maxLength(64), Validators.pattern(/[\u3040-\u30ff]/)]));
    } else {
      array.push(this.fb.control('', [Validators.required, Validators.maxLength(64)]));
    }
  }

  removeArrayEl(array: FormArray, i: number) {
    array.removeAt(i);
  }

  markFormGroupTouched() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].markAsDirty();
    });
    this.meaningFormArray.controls.forEach((control) => {
      control.markAsDirty();
    });
    this.pronunciationFormArray.controls.forEach((control) => {
      control.markAsDirty();
    });
  }

  back(){
    window.history.back();
  }

  resetForm(){
    this.form.reset();
    this.meaningFormArray.clear();
    this.pronunciationFormArray.clear();
    this.addArrayEl(this.meaningFormArray);
    this.addArrayEl(this.pronunciationFormArray, true);
  }

}
