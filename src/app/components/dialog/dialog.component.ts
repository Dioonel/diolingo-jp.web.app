import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { faEdit, faSave, faX } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { DataService } from '@services/data.service';
import { EditFormComponent } from '@components/edit-form/edit-form.component';

interface DataGeneric {
  item: any;
  type: string;
}

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css'],
    standalone: true,
    imports: [FaIconComponent, EditFormComponent]
})
export class DialogComponent implements OnInit, OnDestroy {
  data: DataGeneric;
  subscription!: Subscription;
  editToggle = false;

  faX = faX;
  faEdit = faEdit;
  faSave = faSave;

  constructor(private dialogRef: DialogRef<DataGeneric>, @Inject(DIALOG_DATA) data: DataGeneric, private dataService: DataService, private router: Router) {
    this.data = data;
    this.data.type == 'kanji' ? this.data.type = 'Kanji' : this.data.type = 'Word';
  }

  ngOnInit(): void {
    let type = '';
    if (location.pathname == '/kanji') type = 'kanji';
    else type = 'word';

    if (type === 'kanji') {
      this.subscription = this.dataService.shouldUpdateKanji$.subscribe((shouldUpdate: boolean) => {
        if (shouldUpdate) {
          this.dataService.getOneKanji(this.data.item._id).subscribe((item) => {
            this.data.item = item;
          });
        }
      });
    } else {
      this.subscription = this.dataService.shouldUpdateWords$.subscribe((shouldUpdate: boolean) => {
        if (shouldUpdate) {
          this.dataService.getOneWord(this.data.item._id).subscribe((item) => {
            this.data.item = item;
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  toggleBack(toggle: any) {
    this.editToggle = toggle.toggle;
  }

}
