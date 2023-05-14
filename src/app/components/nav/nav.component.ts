import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  navExpanded = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onNavCheckClick() {
    let nav = document.querySelector('.nav');
    if(nav) nav.classList.toggle('nav-expanded');
  }

  goToHome() {
    this.router.navigateByUrl('/');
  }

  goToWords() {
    this.router.navigateByUrl('/words');
  }

  goToKanji() {
    this.router.navigateByUrl('/kanji');
  }

  goToHiragana() {
    this.router.navigateByUrl('/hiragana');
  }

  goToKatakana() {
    this.router.navigateByUrl('/katakana');
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
