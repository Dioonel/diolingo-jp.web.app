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
      kanji: ['', Validators.required],
      pronunciation: ['', Validators.required],
      meaning: ['', Validators.required],
      category: ['other', Validators.required],
      info: ['']
    });
  }

  submitKanji() {
    if(this.form.valid){
      console.log(this.form.value);
    } else {
      console.log(this.form.errors);
      console.log('form is not valid');
    }
  }
}
