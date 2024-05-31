import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { formatInTimeZone } from 'date-fns-tz';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);
Chart.defaults.font.family = 'Roboto';

import { DataService } from '@services/data.service';
import { Stats } from '@models/stats';
import { TimePipe } from '@pipes/time.pipe';
import { SpinnerComponent } from '@components/spinner/spinner.component';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [MatTabsModule, MatSelectModule, TimePipe, SpinnerComponent],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit {
  loading = true;
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
          return (value * 100 / (this.stats.overall.total_correct + this.stats.overall.total_incorrect)).toFixed(2) + '%';
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
          return (value * 100 / (this.stats.guess.overall.total_correct + this.stats.guess.overall.total_incorrect)).toFixed(2) + '%';
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
          return (value * 100 / (this.stats.pairs.overall.total_correct + this.stats.pairs.overall.total_incorrect)).toFixed(2) + '%';
        }
      }
    }
  }

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getStats().subscribe({
      next: (stats: Stats) => {
        this.loading = false;
        this.stats = stats;
        setTimeout(() => {
          this.renderOverall();
        }, 0);
      }
    });
  }

  renderOverall() {
    const data = this.stats.overall;
    this.overallChart = new Chart('overall', {
      type: 'pie',
      data: {
        labels: ['Correct', 'Incorrect'],
        datasets: [{
          label: '# Answers',
          data: [data.total_correct, data.total_incorrect],
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
    const data = this.stats.guess;
    this.guessBarChart = new Chart('guess', {
      type: 'bar',
      data: {
        labels: data.history.slice(data.history.length - this.timeFilter, data.history.length).map((date) => formatInTimeZone(date.date, 'Etc/UTC', 'MMM dd')),
        datasets: [{
          label: 'Correct',
          data: data.history.slice(data.history.length - this.timeFilter, data.history.length).map((entry) => entry.total_correct),
          backgroundColor: '#63AAE3',
        },
        {
          label: 'Incorrect',
          data: data.history.slice(data.history.length - this.timeFilter, data.history.length).map((entry) => entry.total_incorrect),
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
            data: [data.overall.total_correct, data.overall.total_incorrect],
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
    const data = this.stats.pairs;
    this.pairsBarChart = new Chart('pairs', {
      type: 'bar',
      data: {
        labels: data.history.slice(data.history.length - this.timeFilter, data.history.length).map((date) => formatInTimeZone(date.date, 'Etc/UTC', 'MMM dd')),
        datasets: [{
          label: 'Correct',
          data: data.history.slice(data.history.length - this.timeFilter, data.history.length).map((entry) => entry.total_correct),
          backgroundColor: '#63AAE3',
        },
        {
          label: 'Incorrect',
          data: data.history.slice(data.history.length - this.timeFilter, data.history.length).map((entry) => entry.total_incorrect),
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
            data: [data.overall.total_correct, data.overall.total_incorrect],
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
