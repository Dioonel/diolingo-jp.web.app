import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridComponent } from './grid.component';

import { queryAll } from './../../../testing/helpers';

fdescribe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render kanjis in a grid', () => {
    const kanji = [{
      id: 1,
      kanji: '一',
      meaning: ['one'],
      pronunciation: ['いち'],
    },
    {
      id: 2,
      kanji: '二',
      meaning: ['two'],
      pronunciation: ['に'],
    },
    {
      id: 3,
      kanji: '三',
      meaning: ['three'],
      pronunciation: ['さん'],
    }
  ];
    component.items = kanji;
    fixture.detectChanges();

    const gridItems = queryAll(fixture, '.grid-item');
    expect(gridItems.length).toBe(kanji.length);

    for (let i = 0; i < gridItems.length; i++) {
      expect(gridItems[i].nativeElement.textContent).toContain(kanji[i].kanji);
    }
  });

  it('should render words in a grid', () => {
    const words = [{
      id: 1,
      word: '月曜日',
      meaning: ['monday'],
      pronunciation: ['げつようび'],
    },
    {
      id: 2,
      word: '火曜日',
      meaning: ['tuesday'],
      pronunciation: ['かようび'],
    },
    {
      id: 3,
      word: '水曜日',
      meaning: ['wednesday'],
      pronunciation: ['すいようび'],
    }
  ];
    component.items = words;
    fixture.detectChanges();

    const gridItems = queryAll(fixture, '.grid-item');
    expect(gridItems.length).toBe(words.length);

    for (let i = 0; i < gridItems.length; i++) {
      expect(gridItems[i].nativeElement.textContent).toContain(words[i].word);
    }
  });

  it('should render nothing if items is empty', () => {
    component.items = [];
    fixture.detectChanges();

    const gridItems = queryAll(fixture, '.grid-item');
    expect(gridItems.length).toBe(0);
  });
});
