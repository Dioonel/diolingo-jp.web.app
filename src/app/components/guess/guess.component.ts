import { Component, HostListener, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { faLightbulb, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { DataService } from '@services/data.service';
import { TimerService } from '@services/timer.service';
import { Generic, Guess } from '@models/generic';
import { Score } from '@models/score';
import { SpinnerComponent } from '@components/spinner/spinner.component';
import { FormatArrayPipe } from '@pipes/format-array.pipe';

@Component({
    selector: 'app-guess',
    templateUrl: './guess.component.html',
    styleUrls: ['./guess.component.css'],
    standalone: true,
    imports: [SpinnerComponent, ReactiveFormsModule, FormsModule, MatSelectModule, FaIconComponent, FormatArrayPipe]
})
export class GuessComponent implements OnInit {
  status: 'menu' | 'loading' | 'playing' | 'success' | 'fail' | 'finished' = 'menu';
  gamemode: 'mixed' | 'japanese' | 'meaning' = 'mixed';
  submittingScore: boolean = false;
  submitMsg: string = '';
  gameLength: '5' | '10' | '15' | '20' = '10';
  items: Guess[] = [];
  currentItem!: Guess;
  currentIndex: number = 0;
  userInput: string = '';
  hint: boolean = false;
  score: number = 0;

  faLightbulb = faLightbulb;
  faPlay = faPlay;

  constructor(private dataService: DataService, private timer: TimerService) {}

  ngOnInit(): void {
    this.timer.reset();
  }

  startGame() {
    this.status = 'loading';
    this.dataService.playGuess(Number(this.gameLength)).subscribe((data) => {
      this.items = this.modifyItems(data);
      this.currentItem = this.items[this.currentIndex];
      this.status = 'playing';
      this.timer.start();
      setTimeout(() => {
        document.getElementById('user-input')?.focus();
      }, 0);
    });
  }

  modifyItems(array: Generic[]) {
    if(this.gamemode === 'mixed') {
      let newArray: Guess[] = array.map((item: any) => {
        item = {
          ...item,
          guessMode: this.randomBoolean() ? 'japanese' : 'meaning'
        }
        return item;
      });
      return newArray;
    } else {
      let newArray: Guess[] = array.map((item: any) => {
        item = {
          ...item,
          guessMode: this.gamemode
        }
        return item;
      });
      return newArray;
    }
  }

  randomBoolean() {
    return Math.random() >= 0.5;
  }

  translate() {
    if(Object.keys(this.currentItem).includes('kanji')) return 'Kanji';
    else return 'Word';
  }

  checkAnswer() {
    if(this.currentItem.guessMode === 'meaning') {
      let found = false;
      this.currentItem.meaning.forEach((meaning: string) => {
        if(!found) {
          if(meaning.toLowerCase().trim() == this.userInput.toLowerCase().trim()) found = true;
        }
      });
      if(found) {
        this.status = 'success';
        this.score++;
      }
      else {
        this.status = 'fail';
      }
    } else {
      if(this.currentItem.kanji === this.userInput.trim() || this.currentItem.word === this.userInput.trim()) {
        this.status = 'success';
        this.score++;
      } else {
        this.status = 'fail';
      }
    }
    this.timer.pause();
  }

  continue() {
    this.currentIndex++;
    this.userInput = '';
    this.hint = false;
    if(this.currentIndex < this.items.length) {
      this.currentItem = this.items[this.currentIndex];
      this.status = 'playing';
      this.timer.continue();
      setTimeout(() => {
        document.getElementById('user-input')?.focus();
      }, 0);
    }
    else {
      this.status = 'finished';
      this.timer.pause();
      this.submittingScore = true;
      const score: Score = {
        score: {
          total_correct: this.score,
          total_incorrect: this.items.length - this.score,
          time: this.timer.getTime(),
        },
        type: 'guess'
      }
      this.dataService.submitScore(score).subscribe({
        next: (data) => {
          if(data?.message == 'Score submitted!') {
            this.submittingScore = false;
            this.submitMsg = 'Score submitted!';
          }
        },
        error: (err) => {
          // check if error is 401
          if(err.status === 401) {
            this.submitMsg = 'You must be logged in to submit a score!';
          } else {
            this.submitMsg = 'An error occurred while submitting your score. Please try again later.';
          }
          this.submittingScore = false;
        }
      });
    }
  }

  playAgain() {
    location.reload();
  }

  @HostListener('document:keyup.enter')
  onDocumentKeydownEnter() {
    if(this.status === 'playing' && this.userInput.trim() !== '') {
      this.checkAnswer();
    } else if(this.status === 'success' || this.status === 'fail') {
      this.continue();
    }
  }
}
