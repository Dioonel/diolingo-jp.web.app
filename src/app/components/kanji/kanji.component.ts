import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { DataService } from './../../services/data.service';
import { Kanji } from './../../models/kanji';

@Component({
  selector: 'app-kanji',
  templateUrl: './kanji.component.html',
  styleUrls: ['./kanji.component.css']
})
export class KanjiComponent implements OnInit {
  status: 'init' | 'loading' | 'success' | 'error' = 'init';
  suscription!: Subscription;
  kanji: Kanji[] = [];

  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;

  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.status = 'loading';
    this.activatedRoute.queryParams.subscribe(params => {
      this.dataService.getKanji(params).subscribe(data => {
        this.kanji = data;
        this.status = 'success';
      });
    });

    this.suscription = this.dataService.shouldUpdateKanji$.subscribe((shouldUpdate: boolean) => {
      if(shouldUpdate) this.reload();
    });
  }


  reload() {
    this.suscription.unsubscribe();
    this.router.navigateByUrl(this.router.url);
  }

  pushNewKanji(kanji: Kanji) {
    this.kanji.push(kanji);
  }
}
