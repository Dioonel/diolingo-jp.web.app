import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.css']
})
export class AnnotationsComponent implements OnInit {
  toggleType: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  back(){
    window.history.back();
  }

  toggle(type: string){
    this.toggleType = type;
  }
}
