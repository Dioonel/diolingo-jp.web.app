import { Injectable } from '@angular/core';
import { differenceInSeconds } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private startTime: Date | null = null;
  private accumulatedTime = 0;
  private isRunning = false;

  constructor() {}

  start(): void {
    if (!this.isRunning) {
      this.startTime = new Date();
      this.isRunning = true;
    }
  }

  pause(): void {
    if (this.isRunning && this.startTime) {
      const currentTime = new Date();
      this.accumulatedTime += differenceInSeconds(currentTime, this.startTime);
      this.startTime = null;
      this.isRunning = false;
    }
  }

  continue(): void {
    if (!this.isRunning) {
      this.startTime = new Date();
      this.isRunning = true;
    }
  }

  getTime(): number {
    if (this.isRunning && this.startTime) {
      const currentTime = new Date();
      return this.accumulatedTime + differenceInSeconds(currentTime, this.startTime);
    } else {
      return this.accumulatedTime;
    }
  }

  reset(): void {
    this.startTime = null;
    this.accumulatedTime = 0;
    this.isRunning = false;
  }
}
