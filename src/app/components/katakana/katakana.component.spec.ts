import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatakanaComponent } from './katakana.component';

xdescribe('KatakanaComponent', () => {
  let component: KatakanaComponent;
  let fixture: ComponentFixture<KatakanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [KatakanaComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(KatakanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
