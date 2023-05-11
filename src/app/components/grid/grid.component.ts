import { Component, OnInit, Input } from '@angular/core';
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
  faPencil = faPencil;

  @Input() items: any[] = [];

  constructor(private router: Router, private dialog: Dialog) { }

  ngOnInit(): void {
  }

  // goToEditPage(id: string): void {
  //   let type = this.router.url.split('/')[1];
  //   this.router.navigate([type, 'edit', id]);
  // }

  openDialog(item: any) {
    this.dialog.open(DialogComponent,
      {
        minHeight: '300px',
        minWidth: '340px',
        data: {
          item: item,
          type: this.router.url.split('/')[1]
        },
        panelClass: 'panel-class'
      });
  }
}
