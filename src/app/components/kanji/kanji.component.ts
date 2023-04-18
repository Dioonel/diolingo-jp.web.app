import { Component, OnInit } from '@angular/core';

import { DataService } from './../../services/data.service';
import { Kanji } from './../../models/kanji';

@Component({
  selector: 'app-kanji',
  templateUrl: './kanji.component.html',
  styleUrls: ['./kanji.component.css']
})
export class KanjiComponent implements OnInit {
  kanji: Kanji[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getKanji().subscribe((kanji: Kanji[]) => {
      this.kanji = kanji;
    });
  }
}
