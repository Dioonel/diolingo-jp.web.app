import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { DataService } from './../../services/data.service';
import { faX, faSave, faBackward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  @Output() toggle = new EventEmitter<any>();
  @Input() data: any;
  type!: 'kanji' | 'word';
  pronunciation: any[] = [];

  form!: FormGroup;
  status: 'init' | 'loading' | 'success' | 'error' = 'init';
  errorInfo: string = '';
  validators: Validators[] = [];
  isUpdating = false;

  faX = faX;
  faSave = faSave;
  faBackward = faBackward;

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.status = 'loading';
    this.type = this.data.type.toLowerCase() as 'kanji' | 'word';
    this.data.item.pronunciation.forEach((pr: any) => this.pronunciation.push({pronunciation: pr, isNew: false}));

    if(this.type === 'kanji') this.validators = [Validators.required, Validators.maxLength(1), Validators.pattern(/[\u4e00-\u9faf]/)];
    else this.validators = [Validators.required, Validators.maxLength(64), Validators.pattern(/[\ぁ-んァ-ン一-龠]/)];
    this.buildForm();
    this.form.patchValue(this.data.item);
    this.patchArrays();

    this.status = 'init';
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

  addArrayEl(array: FormArray, flag: boolean = false, flag2: boolean = false) {
    if(flag){
      array.push(this.fb.control([''], [Validators.required, Validators.maxLength(64), Validators.pattern(/[\ぁ-んァ-ン]/)]));
      if(flag2){
        this.pronunciation.push({pronunciation: '', isNew: true});
      }
    } else {
      array.push(this.fb.control('', [Validators.required, Validators.maxLength(64)]));
    }
  }

  removeArrayEl(array: FormArray, i: number) {
    array.removeAt(i);
    if(this.pronunciation.length > this.pronunciationFormArray.length) this.pronunciation.splice(i, 1);
  }

  validateArrayLength(array: FormArray) {
    return array.controls.length > 0;
  }

  patchArrays(){
    for(let i = 0; i < this.data.item.meaning.length; i++){
      if(i > 0) this.addArrayEl(this.meaningFormArray);
      this.meaningFormArray.controls[i].patchValue(this.data.item.meaning[i]);
    }

    for(let i = 0; i < this.data.item.pronunciation.length; i++){
      if(i > 0) this.addArrayEl(this.pronunciationFormArray, true);
      this.pronunciationFormArray.controls[i].patchValue(this.data.item.pronunciation[i]);
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

  executeUpdate() {
    if(this.type === 'kanji') {
      this.dataService.updateKanji(this.form.value, this.data.item._id).subscribe({
        next: (data) => {
          this.status = 'success';
          this.toggle.emit({ toggle: false, update: true });
        },
        error: (err) => {
          this.status = 'error';
          this.errorInfo = err.error;
        }
      });
    } else {
      this.dataService.updateWord(this.form.value, this.data.item._id).subscribe({
        next: (data) => {
          this.status = 'success';
          setTimeout(() => {
            this.toggle.emit({ toggle: false, update: true });
          }, 100);
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
      this.dataService.deleteKanji(this.data.item._id).subscribe({
        next: (data) => {
          this.status = 'success';
          setTimeout(() => {
            this.toggle.emit({ toggle: false, update: true });
          }, 100);
        },
        error: (err) => {
          this.status = 'error';
          this.errorInfo = err.error;
          console.log('error');
        }
      });
    } else {
      this.dataService.deleteWord(this.data.item._id).subscribe({
        next: (data) => {
          this.status = 'success';
          setTimeout(() => {
            this.toggle.emit({ toggle: false, update: true });
          }, 100);
        },
        error: (err) => {
          this.status = 'error';
          this.errorInfo = err.error;
          console.log('error');
        }
      });
    }
  }

  cancel() {
    this.toggle.emit({ toggle: false, update: false });
  }
}
