import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  startTime!: number | undefined;
  pauseTime!: number | undefined;
  scoreTime!: number;

  constructor() {
    this.scoreTime = 0;
  }

  start() {
    if (this.startTime === undefined) {
      this.startTime = Date.now();
    } else {
      console.log("Timer is already running.");
    }
  }

  pause() {
    if (this.startTime !== undefined) {
      this.pauseTime = Date.now();
      this.scoreTime += this.pauseTime - this.startTime;                      // This is the time that has passed since the timer was started
      this.startTime = undefined;
    } else {
      console.log("Timer is already paused.");
    }
  }

  continue() {
    if (this.startTime === undefined) {
      this.startTime = Date.now();
      this.pauseTime = undefined;
    } else {
      console.log("Timer is already running.");
    }
  }

  reset() {
    this.startTime = undefined;
    this.pauseTime = undefined;
    this.scoreTime = 0;
  }

  getFinalTime() {
    if(this.scoreTime === 0) {
      return 0;
    } else {
      const seconds = Math.round(this.scoreTime / 1000);
      return seconds;
    }
  }
}
