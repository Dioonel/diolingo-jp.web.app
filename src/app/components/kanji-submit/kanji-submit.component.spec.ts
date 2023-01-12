import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiSubmitComponent } from './kanji-submit.component';

describe('KanjiSubmitComponent', () => {
  let component: KanjiSubmitComponent;
  let fixture: ComponentFixture<KanjiSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanjiSubmitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanjiSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
