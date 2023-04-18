import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  faPencil = faPencil;

  @Input() items: any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToEditPage(id: string): void {
    let type = this.router.url.split('/')[1];
    this.router.navigate([type, 'edit', id]);
  }
}
