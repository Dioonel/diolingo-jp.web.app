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
  loaded = false;

  constructor() { }

  ngOnInit(): void {
    this.loaded = true;
  }

}
