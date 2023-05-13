import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgModel, FormControl, Validators } from '@angular/forms';
import { faMagnifyingGlass, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  pageType!: 'kanji' | 'word';
  filterType!: 'kanji' | 'word' | 'pronunciation' | 'meaning';
  filterKanji: FormControl = new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern(/[\u4e00-\u9faf]/)]);
  filterWord: FormControl = new FormControl('', [Validators.required, Validators.maxLength(64), Validators.pattern(/[\ぁ-んァ-ン一-龠]/)]);
  filterMeaning: FormControl = new FormControl('', [Validators.required, Validators.maxLength(64)]);
  filterPronunciation: FormControl = new FormControl('', [Validators.required, Validators.maxLength(64), Validators.pattern(/[\u3040-\u30ff]/)]);
  filterDic = { 'word': this.filterWord, 'kanji': this.filterKanji, 'pronunciation': this.filterPronunciation, 'meaning': this.filterMeaning };

  faMagnifyingGlass = faMagnifyingGlass;
  faRotateLeft = faRotateLeft;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    if(location.pathname == '/kanji') this.pageType = 'kanji';
    else this.pageType = 'word';
    this.filterType = this.pageType;
  }

  ngOnInit(): void {
  }

  filter() {
    let params: Params = {};
    if(this.filterType === 'kanji'){
      if(this.filterKanji.valid) {
        params['kanji'] = this.filterKanji.value;
        this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: params });
        params = {};
      }
    } else if(this.filterType === 'word'){
      if(this.filterWord.valid) {
        params['word'] = this.filterWord.value;
        this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: params });
        params = {};
      }
    } else if(this.filterType === 'pronunciation'){
      if(this.filterPronunciation.valid) {
        params['pronunciation'] = this.filterPronunciation.value;
        this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: params });
        params = {};
      }
    } else if(this.filterType === 'meaning'){
      if(this.filterMeaning.valid) {
        params['meaning'] = this.filterMeaning.value;
        this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: params });
        params = {};
      }
    } else {
      console.log('???');
    }
  }

  resetFilters() {
    this.filterKanji.reset();
    this.filterWord.reset();
    this.filterPronunciation.reset();
    this.filterMeaning.reset();
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: {} });
  }

  resetPrevious() {
    this.filterKanji.reset();
    this.filterWord.reset();
    this.filterPronunciation.reset();
    this.filterMeaning.reset();
  }

  markAsTouched() {
    if(this.filterType === 'kanji') this.filterKanji.markAsDirty();
    else if(this.filterType === 'word') this.filterWord.markAsDirty();
    else if(this.filterType === 'pronunciation') this.filterPronunciation.markAsDirty();
    else if(this.filterType === 'meaning') this.filterMeaning.markAsDirty();
  }
}
