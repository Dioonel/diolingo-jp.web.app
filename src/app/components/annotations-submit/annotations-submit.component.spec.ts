import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationsSubmitComponent } from './annotations-submit.component';

describe('AnnotationsSubmitComponent', () => {
  let component: AnnotationsSubmitComponent;
  let fixture: ComponentFixture<AnnotationsSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnotationsSubmitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnotationsSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
