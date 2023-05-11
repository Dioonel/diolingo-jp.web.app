import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import { DataService } from './../../services/data.service';
import { Kanji } from './../../models/kanji';

@Component({
  selector: 'app-kanji',
  templateUrl: './kanji.component.html',
  styleUrls: ['./kanji.component.css']
})
export class KanjiComponent implements OnInit {
  kanji: Kanji[] = [];

  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.getKanji().subscribe((kanji: Kanji[]) => {
      this.kanji = kanji;
    });

    this.dataService.shouldUpdateKanji$.subscribe((shouldUpdate: boolean) => {
      if(shouldUpdate) this.reload();
    });
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  pushNewKanji(kanji: Kanji) {
    this.kanji.push(kanji);
  }
}
