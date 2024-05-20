import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.css'],
    standalone: true,
    imports: [RouterLink]
})
export class PlayComponent implements OnInit {
  loaded = [false, false]
  constructor() {}

  ngOnInit(): void {
  }

  displayDivs(num: number) {
    this.loaded[num] = true;

    if(this.loaded[0] && this.loaded[1]) {
      document.getElementById('game1')?.classList.remove('hidden');
      document.getElementById('game2')?.classList.remove('hidden');
    }
  }
}
