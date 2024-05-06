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
  constructor() { }

  ngOnInit(): void {
  }

  displayDivs() {
    document.getElementById('game1')?.classList.remove('hidden');
    document.getElementById('game2')?.classList.remove('hidden');
  }
}
