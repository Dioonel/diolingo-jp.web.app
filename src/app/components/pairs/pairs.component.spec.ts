import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PairsComponent } from './pairs.component';

xdescribe('PairsComponent', () => {
  let component: PairsComponent;
  let fixture: ComponentFixture<PairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PairsComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(PairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
