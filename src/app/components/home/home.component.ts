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
    if(!sessionStorage.getItem('session')){
      console.log('awake heroku');
      this.dataService.awakeHeroku();
      sessionStorage.setItem('session', 'true');
    }
  }
}
