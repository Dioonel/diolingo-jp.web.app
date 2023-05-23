import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { faPencil, faA, faAsterisk, faWandMagicSparkles, faDiceSix } from '@fortawesome/free-solid-svg-icons';
import { Dialog } from '@angular/cdk/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input() items: any[] = [];
  @Output() clickDialog = new EventEmitter(false);

  faPencil = faPencil;
  faA = faA;
  faAsterisk = faAsterisk;
  faWandMagicSparkles = faWandMagicSparkles;
  faDiceSix = faDiceSix;
  switch!: 'japanese' | 'meaning' | 'all';

  constructor(private router: Router, private dialog: Dialog) {
    this.switch = sessionStorage.getItem('switch') as 'japanese' | 'meaning' | 'all' || 'all';
  }

  ngOnInit(): void {
  }

  openDialog(item: any) {
    let type = '';
    if (location.pathname == '/kanji') type = 'kanji';
    else type = 'word';

    this.clickDialog.emit(true);
    scrollTo(0, 0);
    this.dialog.open(DialogComponent,
      {
        minHeight: '300px',
        minWidth: '340px',
        data: {
          item: item,
          type: type
        },
        panelClass: 'panel-class'
      });
  }

  doSwitch(type: 'japanese' | 'meaning' | 'all') {
    this.switch = type;
    sessionStorage.setItem('switch', type);
  }

  randomize() {
    for (let i = this.items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
  }
}
