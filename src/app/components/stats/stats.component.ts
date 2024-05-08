import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { format } from 'date-fns';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);
Chart.defaults.font.family = 'Roboto';

import { MockOverall, MockGuess, MockPairs, GuessStats, PairsStats } from './../../models/stats';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit, AfterViewInit {
  overallCreated = false;
  guessCreated = false;
  pairsCreated = false;

  overallPieOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          padding: 20,
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
          color: '#bbb'
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
            size: 15
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
          padding: 20,
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
          padding: 20,
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

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.renderOverall();
    this.overallCreated = true;
  }

  renderOverall() {
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
        ...this.overallPieOptions,
      }
    });
  }

  renderGuess() {
    new Chart('guess', {
      type: 'bar',
      data: {
        labels: MockGuess.history.map((date) => format(new Date(date.date), 'MMM dd')),
        datasets: [{
          label: 'Correct',
          data: MockGuess.history.map((entry) => entry.correct_amount),
          backgroundColor: '#63AAE3',
        },
        {
          label: 'Incorrect',
          data: MockGuess.history.map((entry) => entry.incorrect_amount),
          backgroundColor: '#E15554',
        }]
      },
      options: {
        ...this.barOptions
      }
    });

    new Chart('guess-overall', {
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

    this.guessCreated = true;
  }

  renderPairs() {
    new Chart('pairs', {
      type: 'bar',
      data: {
        labels: MockPairs.history.map((date) => format(new Date(date.date), 'MMM dd')),
        datasets: [{
          label: 'Correct',
          data: MockPairs.history.map((entry) => entry.correct_amount),
          backgroundColor: '#63AAE3',
        },
        {
          label: 'Incorrect',
          data: MockPairs.history.map((entry) => entry.incorrect_amount),
          backgroundColor: '#E15554',
        }]
      },
      options: {
        ...this.barOptions
      }
    });

    new Chart('pairs-overall', {
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

    this.pairsCreated = true;
  }

  render(event: any) {
    switch(event.index) {
      case 0 || '0':
        (this.overallCreated) ? null : this.renderOverall();
        break;
      case 1 || '1':
        (this.guessCreated) ? null : this.renderGuess();
        break;
      case 2 || '2':
        (this.pairsCreated) ? null : this.renderPairs();
        break;
    }
  }
}
