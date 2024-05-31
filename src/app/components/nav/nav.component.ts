import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHouse, faPlay, faKey, faMagicWandSparkles, faA, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { formatInTimeZone } from 'date-fns-tz';

import { DataService } from './../../services/data.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    standalone: true,
    imports: [FaIconComponent]
})
export class NavComponent implements OnInit {
  navExpanded = false;
  loggedIn = false;

  faHouse = faHouse;
  faKey = faKey;
  faMagicWandSparkles = faMagicWandSparkles;
  faA = faA;
  faPlay = faPlay;
  faSignOut = faSignOut;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    let today = formatInTimeZone(new Date(), 'Etc/UTC', 'yyyy-MM-dd');
    const token = localStorage.getItem('jwt');
    const session = localStorage.getItem('session');
    if(token && session === today) this.loggedIn = true;           // If there's token and session is today, user is logged in and checked
    else {
      if (token) {                                                 // If there's token but session is not today, check if token is valid
        this.loggedIn = true;
        this.dataService.checkLoggedIn().subscribe({
          next: (status: boolean) => {
            this.loggedIn = status;
            localStorage.setItem('session', today);
          },
          error: (err: any) => {
            this.loggedIn = false;
            localStorage.removeItem('jwt');
            localStorage.removeItem('session');
          }
        });
      }
    }
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

  goToLogin() {
    this.router.navigateByUrl('/login');
    document.getElementById('nav-check')?.click();
  }

  goToPlay() {
    this.router.navigateByUrl('/play');
    document.getElementById('nav-check')?.click();
  }

  logout() {
    if(window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('session');
      location.reload();
    }
  }
}
