import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  navExpanded = false;

  constructor() { }

  ngOnInit(): void {
  }

  onNavCheckClick() {
    let nav = document.querySelector('.nav');
    if(nav) nav.classList.toggle('nav-expanded');
  }

}
