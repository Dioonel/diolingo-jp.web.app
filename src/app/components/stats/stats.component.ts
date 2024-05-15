import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { formatInTimeZone } from 'date-fns-tz';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);
Chart.defaults.font.family = 'Roboto';

import { MockOverall, MockGuess, MockPairs, Stats } from './../../models/stats';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [MatTabsModule, MatSelectModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit, AfterViewInit {
  stats!: Stats;
  timeFilter: 7 | 14 | 28 = 7
  overallChart: any;
  guessBarChart: any;
  guessPieChart: any;
  pairsBarChart: any;
  pairsPieChart: any;

  overallPieOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16
          },
          color: '#bbb',
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
      },
      datalabels: {
        color: '#fff',
        font: {
          size: 20
        },
        textShadowColor: '#000',
        textShadowBlur: 5,
        formatter: (value: any) => {
          return (value * 100 / (MockOverall.total_correct + MockOverall.total_incorrect)).toFixed(2) + '%';
        }
      }
    }
  }

  barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        stacked: true,
        ticks: {
          color: '#bbb',
          maxTicksLimit: 7,
          font: {
            size: 14
          }
        },
        grid: {
          color: '#3c4042'
        }
      },
      x: {
        stacked: true,
        ticks: {
          color: '#bbb',
          maxTicksLimit: 10,
        },
        grid: {
          color: '#3c4042'
        }
      }
    },
    plugins: {
      datalabels: {
        display: false
      },
      legend: {
        labels: {
          color: '#bbb',
          font: {
            size: 16
          }
        },
        // Disables legend interaction
        onClick: (e: any) => e.stopPropagation(),
      },
      tooltip: {
        bodyFont: {
          size: 15
        },
        titleFont: {
          size: 15
        }
      },
    }
  }

  guessPieOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16
          },
          color: '#bbb',
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
      },
      datalabels: {
        color: '#fff',
        font: {
          size: 20
        },
        textShadowColor: '#000',
        textShadowBlur: 5,
        formatter: (value: any) => {
          return (value * 100 / (MockGuess.overall.total_correct + MockGuess.overall.total_incorrect)).toFixed(2) + '%';
        }
      }
    }
  }

  pairsPieOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16
          },
          color: '#bbb',
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
      },
      datalabels: {
        color: '#fff',
        font: {
          size: 20
        },
        textShadowColor: '#000',
        textShadowBlur: 5,
        formatter: (value: any) => {
          return (value * 100 / (MockPairs.overall.total_correct + MockPairs.overall.total_incorrect)).toFixed(2) + '%';
        }
      }
    }
  }

  constructor() {}

  ngOnInit(): void {
    this.stats = {
      _id: '1',
      user_id: '123123',
      overall: MockOverall,
      guess: MockGuess,
      pairs: MockPairs,
      last_checked: '2024-02-01'
    }
  }

  ngAfterViewInit() {
    this.renderOverall();
  }

  renderOverall() {
    this.overallChart = new Chart('overall', {
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
        ...this.overallPieOptions,
      }
    });
  }

  renderGuess() {
    this.guessBarChart = new Chart('guess', {
      type: 'bar',
      data: {
        labels: MockGuess.history.slice(MockGuess.history.length - this.timeFilter, MockGuess.history.length).map((date) => formatInTimeZone(date.date, 'America/Buenos_Aires', 'MMM dd')),
        datasets: [{
          label: 'Correct',
          data: MockGuess.history.slice(MockGuess.history.length - this.timeFilter, MockGuess.history.length).map((entry) => entry.total_correct),
          backgroundColor: '#63AAE3',
        },
        {
          label: 'Incorrect',
          data: MockGuess.history.slice(MockGuess.history.length - this.timeFilter, MockGuess.history.length).map((entry) => entry.total_incorrect),
          backgroundColor: '#E15554',
        }]
      },
      options: {
        ...this.barOptions
      }
    });

    if(!this.guessPieChart?.ctx) {
      this.guessPieChart = new Chart('guess-overall', {
        type: 'pie',
        data: {
          labels: ['Correct', 'Incorrect'],
          datasets: [{
            label: '# Answers',
            data: [MockGuess.overall.total_correct, MockGuess.overall.total_incorrect],
            backgroundColor: [
              '#63AAE3',
              '#E15554'
            ],
            borderColor: '',
            borderWidth: 1
          }]
        },
        options: {
          ...this.guessPieOptions,
        }
      });
    }
  }

  renderPairs() {
    this.pairsBarChart = new Chart('pairs', {
      type: 'bar',
      data: {
        labels: MockPairs.history.slice(MockPairs.history.length - this.timeFilter, MockPairs.history.length).map((date) => formatInTimeZone(date.date, 'America/Buenos_Aires', 'MMM dd')),
        datasets: [{
          label: 'Correct',
          data: MockPairs.history.slice(MockPairs.history.length - this.timeFilter, MockPairs.history.length).map((entry) => entry.total_correct),
          backgroundColor: '#63AAE3',
        },
        {
          label: 'Incorrect',
          data: MockPairs.history.slice(MockPairs.history.length - this.timeFilter, MockPairs.history.length).map((entry) => entry.total_incorrect),
          backgroundColor: '#E15554',
        }]
      },
      options: {
        ...this.barOptions
      }
    });

    if(!this.pairsPieChart?.ctx) {
      this.pairsPieChart = new Chart('pairs-overall', {
        type: 'pie',
        data: {
          labels: ['Correct', 'Incorrect'],
          datasets: [{
            label: '# Answers',
            data: [MockPairs.overall.total_correct, MockPairs.overall.total_incorrect],
            backgroundColor: [
              '#63AAE3',
              '#E15554'
            ],
            borderColor: '',
            borderWidth: 1
          }]
        },
        options: {
          ...this.pairsPieOptions,
        }
      });
    }
  }

  render(event: any) {
    switch(event.index) {
      case 0 || '0':
        (this.overallChart?.ctx) ? null : this.renderOverall();
        break;
      case 1 || '1':
        (this.guessBarChart?.ctx) ? null : this.renderGuess();
        break;
      case 2 || '2':
        (this.pairsBarChart?.ctx) ? null : this.renderPairs();
        break;
    }
  }

  executeFilter(tabIndex: number) {
    if(this.guessBarChart?.ctx && this.guessPieChart?.ctx) this.guessBarChart.destroy();
    if(this.pairsBarChart?.ctx && this.pairsPieChart?.ctx) this.pairsBarChart.destroy();
    this.render({ index: tabIndex });
  }
}
