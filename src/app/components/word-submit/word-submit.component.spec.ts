import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSubmitComponent } from './word-submit.component';

describe('WordSubmitComponent', () => {
  let component: WordSubmitComponent;
  let fixture: ComponentFixture<WordSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordSubmitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
