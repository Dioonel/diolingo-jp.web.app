import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgModel, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-kanji-search',
  templateUrl: './kanji-search.component.html',
  styleUrls: ['./kanji-search.component.css']
})
export class KanjiSearchComponent implements OnInit {
  filterType: string = '0';
  filterKanji: FormControl = new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern(/[\u4e00-\u9faf]/)]);
  filterPronunciation: FormControl = new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern(/[\u3040-\u30ff]/)]);
  filterMeaning: FormControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  filterCategory: FormControl = new FormControl('', Validators.required);
  isBack = false;
  isNext = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  offset(n: number){
    this.activatedRoute.queryParams.subscribe(params => {
      let myQuery: Params = {};
      if(params['title']) {
        myQuery['title'] = params['title'];
      }
      myQuery['offset'] = n;
      this.router.navigate([], {relativeTo: this.activatedRoute, queryParams: myQuery, queryParamsHandling: 'merge'});
      window.location.reload();
    });
  }

  paginateConfig(n: number){
    this.activatedRoute.queryParams.subscribe(params => {
      if(params['offset']) {
        if(params['offset'] > 0) {
          this.isBack = true;
        }
        if(params['offset'] < n) {
          this.isNext = true;
        }
      } else {
        if(n > 0) {
          this.isNext = true;
        }
      }
    });
  }

  backO(){
    this.activatedRoute.queryParams.subscribe(params => {
      if(params['offset']) {
        this.offset(params['offset'] - 1);
      }
    });
  }

  next(){
    this.activatedRoute.queryParams.subscribe(params => {
      if(params['offset']) {
        this.offset(Number(params['offset']) + 1);
      } else {
        this.offset(1);
      }
    });
  }

  filter() {
    console.log(this.filterType);
    if(this.filterType === '0'){
      console.log('refresh loco XD');
    } else if(this.filterType === '1'){
      if(this.filterKanji.valid) {
        console.log(this.filterKanji.value);
      }
    } else if(this.filterType === '2'){
      if(this.filterPronunciation.valid) {
        console.log(this.filterPronunciation.value);
      }
    } else if(this.filterType === '3'){
      if(this.filterMeaning.valid) {
        console.log(this.filterMeaning.value);
      }
    } else if(this.filterType === '4'){
      if(this.filterCategory.valid) {
        console.log(this.filterCategory.value);
      }
    } else {
      console.log('???');
    }
  }

  resetPrevious() {
    console.log('reset?');
    this.filterKanji.reset();
    this.filterPronunciation.reset();
    this.filterMeaning.reset();
    this.filterCategory.reset();
  }

  markAsTouched() {
    if(this.filterType === '1'){
      this.filterKanji.markAsDirty();
    } else if(this.filterType === '2'){
      this.filterPronunciation.markAsDirty();
    } else if(this.filterType === '3'){
      this.filterMeaning.markAsDirty();
    } else if(this.filterType === '4'){
      this.filterCategory.markAsDirty();
    }
  }

  back(){
    window.history.back();
  }
}
