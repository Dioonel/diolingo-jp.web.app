import { Component, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import { DataService } from './../../../app/services/data.service';
import { Generic, Pairs } from './../../../app/models/generic';

@Component({
  selector: 'app-pairs',
  templateUrl: './pairs.component.html',
  styleUrls: ['./pairs.component.css']
})
export class PairsComponent implements OnInit {
  status: 'menu' | 'loading' | 'playing' | 'continue' | 'finished' = 'menu';
  gameLength: '10' | '20' | '30' | '40' = '20';
  items: Generic[] = [];
  currentItems: Pairs[] = [];
  currentIndex: number = 0;
  meaningPositions: number[] = [1, 2, 3, 4, 5];
  japanesePositions: number[] = [1, 2, 3, 4, 5];
  selectedMeaning: string = '';
  selectedJapanese: string = '';
  score: number = 0;
  successPositionsM: any[] = [];
  successPositionsJ: any[] = [];
  failedPositionsM: any[] = [];
  failedPositionsJ: any[] = [];

  faPlay = faPlay;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  startGame() {
    this.status = 'loading';
    this.dataService.playPairs(Number(this.gameLength)).subscribe((data) => {
      this.items = data;
      this.meaningPositions = this.shuffleArray(this.meaningPositions);
      this.japanesePositions = this.shuffleArray(this.japanesePositions);
      this.updateCurrentItems();
      this.status = 'playing';
      console.log(this.items);
      console.log(this.currentItems);
    });
  }

  updateCurrentItems() {
    this.currentItems = [];
    for(let i = 0; i < 5; i++) {
      this.currentItems.push(this.items[this.currentIndex + i]);
      this.currentItems[i].meaningPosition = this.meaningPositions[i];
      this.currentItems[i].japanesePosition = this.japanesePositions[i];
    }
    this.currentIndex += 5;
  }

  shuffleArray(array: number[]) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  findItemByPosition(position: number, type: string) {
    if(type === 'meaning') return this.currentItems.find((item) => item.meaningPosition === position);
    else return this.currentItems.find((item) => item.japanesePosition === position);
  }

  findItemById(id: string) {
    return this.currentItems.find((item) => item._id === id);
  }

  change(position: number, type: string) {
    if(type === 'meaning') this.selectedMeaning = this.findItemByPosition(position, type)?._id || '';
    else this.selectedJapanese = this.findItemByPosition(position, type)?._id || '';

    if(this.selectedMeaning && this.selectedJapanese) {
      console.log(this.selectedMeaning, this.selectedJapanese);
      if(this.selectedMeaning === this.selectedJapanese) {
        this.score++;
        this.successPositionsM.push(this.findItemById(this.selectedMeaning)?.meaningPosition);
        this.successPositionsJ.push(this.findItemById(this.selectedJapanese)?.japanesePosition);
      } else {
        this.failedPositionsM.push(this.findItemById(this.selectedMeaning)?.meaningPosition);
        this.failedPositionsJ.push(this.findItemById(this.selectedJapanese)?.japanesePosition);
      }
      // uncheck
      let meaningElement = document.getElementById(this.selectedMeaning);
      let japaneseElement = document.getElementById(this.selectedJapanese);
      if(meaningElement) meaningElement.classList.remove('checked');
      if(japaneseElement) japaneseElement.classList.remove('checked');
      this.selectedMeaning = '';
      this.selectedJapanese = '';
    }
    if(this.successPositionsJ.length + this.failedPositionsJ.length === 5) {
      this.status = 'continue';
    }
  }

  continue() {
    if(this.currentIndex < this.items.length) {
      this.meaningPositions = this.shuffleArray(this.meaningPositions);
      this.japanesePositions = this.shuffleArray(this.japanesePositions);
      this.updateCurrentItems();
      this.status = 'playing';
    } else {
      this.status = 'finished';
    }
    this.successPositionsM = [];
    this.successPositionsJ = [];
    this.failedPositionsM = [];
    this.failedPositionsJ = [];
  }

  playAgain() {
    location.reload();
  }
}
