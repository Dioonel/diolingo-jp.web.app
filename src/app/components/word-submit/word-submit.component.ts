import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { DataService } from '@services/data.service';
import { Word } from '@models/word';

@Component({
    selector: 'app-word-submit',
    templateUrl: './word-submit.component.html',
    styleUrls: ['./word-submit.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, FaIconComponent]
})
export class WordSubmitComponent implements OnInit {
  @Output() newWord = new EventEmitter<Word>();

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
      word: ['', [Validators.required, Validators.maxLength(64), Validators.pattern(/[\ぁ-んァ-ン一-龠]/)]],
      meaning: this.fb.array([this.fb.control('', [Validators.required, Validators.maxLength(64)])]),
      pronunciation: this.fb.array([this.fb.control('', [Validators.required, Validators.maxLength(64), Validators.pattern(/[\ぁ-んァ-ン]/)])]),
      notes: []
    });
  }

  submitWord() {
    this.status = 'loading';
    if (this.form.valid && this.validateArrayLength(this.meaningFormArray) && this.validateArrayLength(this.pronunciationFormArray)) {
      this.dataService.createWord(this.form.value).subscribe({
        next: (data) => {
          this.resetForm();
          this.status = 'success';
          this.newWord.emit(data);
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
      array.push(this.fb.control('', [Validators.required, Validators.maxLength(64), Validators.pattern(/[\u3040-\u30ff]/)]));
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
