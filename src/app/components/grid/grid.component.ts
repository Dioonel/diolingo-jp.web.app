import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
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

  constructor(private router: Router, private dialog: Dialog) { }

  ngOnInit(): void {
  }

  openDialog(item: any) {
    let type = '';
    if(location.pathname == '/kanji') type = 'kanji';
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
}
