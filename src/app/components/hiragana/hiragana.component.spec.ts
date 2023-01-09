import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiraganaComponent } from './hiragana.component';

describe('HiraganaComponent', () => {
  let component: HiraganaComponent;
  let fixture: ComponentFixture<HiraganaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiraganaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiraganaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
