import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Kanji } from './../../../app/models/kanji';

import { DataService } from './../../../app/services/data.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-kanji-submit',
    templateUrl: './kanji-submit.component.html',
    styleUrls: ['./kanji-submit.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, FaIconComponent]
})
export class KanjiSubmitComponent implements OnInit {

  form!: FormGroup;
  status: 'init' | 'loading' | 'success' | 'error' = 'init';
  errorInfo: string = '';

  faSave = faSave;
  faTrash = faTrash;

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      kanji: ['', [Validators.required, Validators.maxLength(1), Validators.pattern(/[\u4e00-\u9faf]/)]],           // Kanji regex
      meaning: this.fb.array([this.fb.control('', [Validators.required, Validators.maxLength(64)])]),
      pronunciation: this.fb.array([this.fb.control('', [Validators.required, Validators.maxLength(64), Validators.pattern(/[\u3040-\u30ff]/)])]),
      notes: []
      //category: ['other', Validators.required],
    });
  }

  submitKanji() {
    this.status = 'loading';
    if (this.form.valid && this.validateArrayLength(this.meaningFormArray) && this.validateArrayLength(this.pronunciationFormArray)) {
      this.dataService.createKanji(this.form.value).subscribe({
        next: (data) => {
          this.resetForm();
          this.status = 'success';
        },
        error: (err) => {
          this.status = 'error';
          this.errorInfo = err.error;
        }
      })
    } else {
      this.status = 'error';
      this.errorInfo = 'Form is not valid';
    }
  }

  get meaningFormArray() {
    return this.form.get('meaning') as FormArray;
  }

  get pronunciationFormArray() {
    return this.form.get('pronunciation') as FormArray;
  }

  addArrayEl(array: FormArray, flag: boolean = false) {
    if (flag) {
      array.push(this.fb.control('', [Validators.required, Validators.maxLength(64), Validators.pattern(/[\ぁ-んァ-ン]/)]));
    } else {
      array.push(this.fb.control('', [Validators.required, Validators.maxLength(64)]));
    }
  }

  removeArrayEl(array: FormArray, i: number) {
    array.removeAt(i);
  }

  validateArrayLength(array: FormArray) {
    return array.controls.length > 0;
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

  resetForm() {
    this.form.reset();
    this.meaningFormArray.clear();
    this.pronunciationFormArray.clear();
    this.addArrayEl(this.meaningFormArray);
    this.addArrayEl(this.pronunciationFormArray, true);
  }
}
