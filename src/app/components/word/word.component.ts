import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { DataService } from './../../services/data.service';
import { Word } from './../../models/word';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {
  status: 'init' | 'loading' | 'success' | 'error' = 'init';
  suscription!: Subscription;
  words: Word[] = [];

  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;

  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.status = 'loading';
    this.activatedRoute.queryParams.subscribe(params => {
      this.dataService.getWords(params).subscribe(data => {
        this.words = data;
        this.status = 'success';
      });
    });

    this.suscription = this.dataService.shouldUpdateWords$.subscribe((shouldUpdate: boolean) => {
      if(shouldUpdate) this.reload();
    });
  }

  reload() {
    this.suscription.unsubscribe();
    this.router.navigateByUrl(this.router.url);
  }

  pushNewWord(word: Word) {
    this.words.push(word);
  }
}
