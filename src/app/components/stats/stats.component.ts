import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { MockOverall, MockGuess, MockPairs } from './../../models/stats';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {

}
