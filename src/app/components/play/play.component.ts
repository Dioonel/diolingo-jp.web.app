import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  loaded = false;

  constructor() { }

  ngOnInit(): void {
    this.loaded = true;
  }

}
