import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiSearchComponent } from './kanji-search.component';

describe('KanjiSearchComponent', () => {
  let component: KanjiSearchComponent;
  let fixture: ComponentFixture<KanjiSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanjiSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanjiSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
