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
    if (nav) nav.classList.toggle('nav-expanded');
  }

  goToHome() {
    this.router.navigateByUrl('/');
    document.getElementById('nav-check')?.click();
  }

  goToWords() {
    this.router.navigateByUrl('/words');
    document.getElementById('nav-check')?.click();
  }

  goToKanji() {
    this.router.navigateByUrl('/kanji');
    document.getElementById('nav-check')?.click();
  }

  goToHiragana() {
    this.router.navigateByUrl('/hiragana');
    document.getElementById('nav-check')?.click();
  }

  goToKatakana() {
    this.router.navigateByUrl('/katakana');
    document.getElementById('nav-check')?.click();
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
    document.getElementById('nav-check')?.click();
  }
}
