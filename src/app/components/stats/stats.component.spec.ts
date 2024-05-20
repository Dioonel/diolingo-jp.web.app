import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';

import { StatsComponent } from './stats.component';
import { DataService } from './../../services/data.service';
import { mockObservable } from './../../../testing/helpers';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;
  let de: DebugElement;
  let service: jasmine.SpyObj<DataService>;                                           // spy step 1

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DataService', ['getStats']);                    // spy step 2
    spy.getStats.and.returnValue(mockObservable({
      _id: '1',
      user_id: '1',
      overall: {
        total_correct: 0,
        total_incorrect: 0,
        total_time: 0
      },
      guess: {
        history: [],
        overall: {
          total_correct: 0,
          total_incorrect: 0,
          total_time: 0,
          average_time: 0
        }
      },
      pairs: {
        history: [],
        overall: {
          total_correct: 0,
          total_incorrect: 0,
          total_time: 0,
          average_time: 0
        }
      },
      last_checked: '2021-07-01'
    }));

    await TestBed.configureTestingModule({
      imports: [
        StatsComponent,
        MatTabsModule,
        MatSelectModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: DataService, useValue: spy }                                         // spy step 3
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;               // spy step 4
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call DataService.getStats', () => {
    expect(service.getStats).toHaveBeenCalled();
  });

  it('should have stats', () => {
    expect(component.stats).toBeTruthy();
  });

});
