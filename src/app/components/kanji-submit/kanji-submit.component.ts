import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kanji-submit',
  templateUrl: './kanji-submit.component.html',
  styleUrls: ['./kanji-submit.component.css']
})
export class KanjiSubmitComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      kanji: ['', [Validators.required, Validators.pattern(/[\u4e00-\u9faf]/)]],                      // Kanji regex
      pronunciation: ['', [Validators.required, Validators.pattern(/[\u3040-\u30ff]/)]],              // Hiragana & katakana regex
      meaning: ['', Validators.required],
      category: ['other', Validators.required],
      info: ['']
    });
  }

  submitKanji() {
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
