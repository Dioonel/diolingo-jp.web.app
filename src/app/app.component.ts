import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '@components/nav/nav.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [NavComponent, RouterOutlet]
})
export class AppComponent {
  title = 'japanese';
}
