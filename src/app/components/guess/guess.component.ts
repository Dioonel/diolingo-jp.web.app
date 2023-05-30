import { Component, OnInit } from '@angular/core';
import { faLightbulb, faPlay } from '@fortawesome/free-solid-svg-icons';

import { DataService } from './../../../app/services/data.service';
import { Generic, Guess } from './../../../app/models/generic';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.css']
})
export class GuessComponent implements OnInit {
  status: 'menu' | 'loading' | 'playing' | 'success' | 'fail' | 'finished' = 'menu';
  gameLength: '5' | '10' | '15' | '20' = '10';
  items: Guess[] = [];
  currentItem!: Guess;
  currentIndex: number = 0;
  userInput: string = '';
  hint: boolean = false;
  score: number = 0;

  faLightbulb = faLightbulb;
  faPlay = faPlay;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  startGame() {
    this.status = 'loading';
    this.dataService.playGuess(Number(this.gameLength)).subscribe((data) => {
      this.items = this.modifyItems(data);
      this.currentItem = this.items[this.currentIndex];
      this.status = 'playing';
    });
  }

  modifyItems(array: Generic[]) {
    let newArray: Guess[] = array.map((item: any) => {
      item = {
        ...item,
        guessMode: this.randomBoolean() ? 'japanese' : 'meaning'
      }
      return item;
    });
    return newArray;
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
  }

  continue() {
    this.currentIndex++;
    this.userInput = '';
    this.hint = false;
    if(this.currentIndex < this.items.length) {
      this.currentItem = this.items[this.currentIndex];
      this.status = 'playing';
    }
    else {
      this.status = 'finished';
    }
  }

  playAgain() {
    location.reload();
  }
}
