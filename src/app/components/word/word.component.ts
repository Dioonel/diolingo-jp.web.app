import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import { DataService } from './../../services/data.service';
import { Word } from './../../models/word';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {
  words: Word[] = [];

  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.getWords().subscribe((words: Word[]) => {
      this.words = words;
    });

    this.dataService.shouldUpdateWords$.subscribe((shouldUpdate: boolean) => {
      if(shouldUpdate) this.reload();
    });
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  pushNewWord(word: Word) {
    this.words.push(word);
  }
}
