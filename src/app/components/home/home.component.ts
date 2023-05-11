import { Component, OnInit } from '@angular/core';

import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    if(!localStorage.getItem('session')){
      this.dataService.awakeHeroku();
      localStorage.setItem('session', 'true');
    }
  }
}
