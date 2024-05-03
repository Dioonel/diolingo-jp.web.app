import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiComponent } from './kanji.component';

xdescribe('KanjiComponent', () => {
  let component: KanjiComponent;
  let fixture: ComponentFixture<KanjiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [KanjiComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(KanjiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
