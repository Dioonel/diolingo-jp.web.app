import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { DataService } from './../../../app/services/data.service';
import { Kanji } from './../../../app/models/kanji';
import { Word } from './../../../app/models/word';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form!: FormGroup;
  status: 'init' | 'loading' | 'success' | 'error' = 'init';
  errorInfo: string = '';
  type!: 'kanji' | 'word';
  obj!: Kanji | Word;
  validators: Validators[] = [];
  faTrashCan = faTrashCan;

  constructor(private fb: FormBuilder, private dataService: DataService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.status = 'loading';
    this.activeRoute.params.subscribe((params) => {
      if(params['type'] == 'kanji') this.type = 'kanji';
      else this.type = 'word';
      this.dataService.getGenericById<Kanji | Word>(params['id'], params['type']).subscribe({
        next: (data) => {
          this.obj = data;
        },
        error: (err) => {
          this.status = 'error';
          this.errorInfo = err.error;
        },
        complete: () => {
          if(this.type == 'kanji') this.validators = [Validators.required, Validators.maxLength(1), Validators.pattern(/[\u4e00-\u9faf]/)];
          else this.validators = [Validators.required, Validators.maxLength(64), Validators.pattern(/[\ぁ-んァ-ン一-龠]/)];
          this.buildForm();
          this.form.patchValue(this.obj);
          this.patchArrays();
          // update DOM changes
          setTimeout(() => {
            this.form.controls[this.type].markAsTouched();
          }, 0);
          this.status = 'init';
        }
      });
    });
  }


  private buildForm() {
    this.form = this.fb.group({
      [this.type]: ['', this.validators],
      meaning: this.fb.array([this.fb.control('', [Validators.required, Validators.maxLength(64)])]),
      pronunciation: this.fb.array([this.fb.control('', [Validators.required, Validators.maxLength(64), Validators.pattern(/[\u3040-\u30ff]/)])]),
      notes: []
      //category: ['other', Validators.required],
    });
  }

  update() {
    this.status = 'loading';
    if(this.form.valid && this.validateArrayLength(this.meaningFormArray) && this.validateArrayLength(this.pronunciationFormArray)){
      this.executeUpdate();
    } else {
      this.status = 'error';
      this.errorInfo = 'Form is not valid';
    }
  }

  delete() {
    this.status = 'loading';
    this.executeDelete();
  }

  get meaningFormArray() {
    return this.form.get('meaning') as FormArray;
  }

  get pronunciationFormArray() {
    return this.form.get('pronunciation') as FormArray;
  }

  addArrayEl(array: FormArray, flag: boolean = false) {
    if(flag){
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

  patchArrays(){
    for(let i = 0; i < this.obj.meaning.length; i++){
      if(i > 0) this.addArrayEl(this.meaningFormArray);
      this.meaningFormArray.controls[i].patchValue(this.obj.meaning[i]);
    }
    for(let i = 0; i < this.obj.pronunciation.length; i++){
      if(i > 0) this.addArrayEl(this.pronunciationFormArray, true);
      this.pronunciationFormArray.controls[i].patchValue(this.obj.pronunciation[i]);
    }
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

  resetForm(){
    this.form.reset();
    this.meaningFormArray.clear();
    this.pronunciationFormArray.clear();
    this.addArrayEl(this.meaningFormArray);
    this.addArrayEl(this.pronunciationFormArray, true);
  }

  executeUpdate() {
    if(this.type === 'kanji') {
      console.log(this.form.value);
      this.dataService.updateKanji(this.form.value, this.obj._id).subscribe({
        next: (data) => {
          this.resetForm();
          this.status = 'success';
        },
        error: (err) => {
          this.status = 'error';
          this.errorInfo = err.error;
        }
      });
    } else {
      console.log(this.form.value);
      this.dataService.updateWord(this.form.value, this.obj._id).subscribe({
        next: (data) => {
          this.resetForm();
          this.status = 'success';
        },
        error: (err) => {
          this.status = 'error';
          this.errorInfo = err.error;
        }
      });
    }
  }

  executeDelete() {
    if(this.type === 'kanji') {
      this.dataService.deleteKanji(this.obj._id).subscribe({
        next: (data) => {
          this.resetForm();
          this.status = 'success';
          setTimeout(() => {
            this.router.navigate(['/kanji']);
          }, 1500);
        },
        error: (err) => {
          this.status = 'error';
          this.errorInfo = err.error;
        }
      });
    } else {
      this.dataService.deleteWord(this.obj._id).subscribe({
        next: (data) => {
          this.resetForm();
          this.status = 'success';
          setTimeout(() => {
            this.router.navigate(['/words']);
          }, 1000);
        },
        error: (err) => {
          this.status = 'error';
          this.errorInfo = err.error;
        }
      });
    }
  }

  timeline() {
    if(this.type === 'kanji') this.router.navigate(['/kanji']);
    else this.router.navigate(['/words']);
  }

}

