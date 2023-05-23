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
  loadMoreStatus: 'init' | 'loading' | 'success' | 'error' = 'init';
  suscription!: Subscription;
  words: Word[] = [];
  limit = 0;
  skip = 0;
  noMore = false;

  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;

  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    if (window.innerWidth >= 955) this.limit = 30;
    else if (window.innerWidth >= 655) this.limit = 20;
    else this.limit = 10;
  }

  ngOnInit(): void {
    this.status = 'loading';
    this.loadMore();

    this.suscription = this.dataService.shouldUpdateWords$.subscribe((shouldUpdate: boolean) => {
      if (shouldUpdate) this.reload();
    });
  }

  reload() {
    this.suscription.unsubscribe();
    this.router.navigateByUrl(this.router.url);
  }

  loadMore() {
    this.loadMoreStatus = 'loading';
    this.activatedRoute.queryParams.subscribe(params => {
      this.dataService.getWords({ ...params, limit: this.limit, skip: this.skip }).subscribe(data => {
        this.loadMoreStatus = 'success';
        this.words.push(...data);
        if (this.skip === 0) this.status = 'success';
        this.skip++;
        if (data.length < this.limit) this.noMore = true;
      });
    });
  }
}
