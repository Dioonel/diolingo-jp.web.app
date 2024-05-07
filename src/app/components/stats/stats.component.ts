import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Chart, ChartItem, registerables } from 'chart.js';
Chart.register(...registerables);


import { MockOverall, MockGuess, MockPairs } from './../../models/stats';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.renderOverall();
    // this.renderGuess();
    // this.renderPairs();
  }

  renderOverall() {
    const legendMargin: any = {
      id: 'legendMargin',
      beforeInit: function(chart: any, legend: any, options: any) {
        console.log(chart.legend.fit);
      }
    };

    new Chart('overall', {
      type: 'pie',
      data: {
        labels: ['Correct', 'Incorrect'],
        datasets: [{
          label: '# Answers',
          data: [MockOverall.total_correct, MockOverall.total_incorrect],
          backgroundColor: [
            '#63AAE3',
            '#E15554'
          ],
          borderColor: '',
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              padding: 20,
              font: {
                size: 16
              },
              color: '#fff',
            },
            // Disables legend interaction
            onClick: (e: any) => e.stopPropagation()
          },
          tooltip: {
            bodyFont: {
              size: 15
            },
            titleFont: {
              size: 15
            }
          }
        },
      }
    });
  }
}
