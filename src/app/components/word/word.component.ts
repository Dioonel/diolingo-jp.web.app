import { Component, OnInit } from '@angular/core';

import { DataService } from './../../services/data.service';
import { Word } from './../../models/word';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {

  words: Word[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getWords().subscribe((words: Word[]) => {
      this.words = words;
    });
  }
}
