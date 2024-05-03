import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { of } from 'rxjs';

import { EditFormComponent } from './edit-form.component';
import { DataService } from './../../../app/services/data.service';
import { query, getText, setInputValue, clickElement, mockObservable, asyncError } from './../../../testing/helpers';
import { By } from '@angular/platform-browser';

describe('EditFormComponent', () => {
  let component: EditFormComponent;
  let fixture: ComponentFixture<EditFormComponent>;
  let de: DebugElement;
  let service: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DataService', ['updateKanji', 'updateWord', 'deleteKanji', 'deleteWord']);

    await TestBed.configureTestingModule({
    imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        FontAwesomeModule,
        EditFormComponent
    ],
    providers: [
        { provide: DataService, useValue: spy },
    ]
})
      .compileComponents();
  });

  describe('initialization', () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(EditFormComponent);
      component = fixture.componentInstance;
      de = fixture.debugElement;
      component.data = { type: 'Kanji', item: { _id: '123', kanji: '漢', meaning: ['kanji'], pronunciation: ['かん'], notes: 'notes', created_at: Date.now() } };
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render and load the form', () => {
      const title = getText(fixture, '#title');
      const kanjiInput = query(fixture, `#${component.type}`);

      expect(component.type).toBe('kanji');
      expect(component.meaningFormArray.length).toBe(1);
      expect(component.pronunciationFormArray.length).toBe(1);
      expect(title).toContain('Kanji');
      expect(kanjiInput?.nativeElement.value).toBe('漢');
    });

  });

  describe('form validity', () => {

    describe('programatically', () => {

      describe('kanji type', () => {

        beforeEach(() => {
          fixture = TestBed.createComponent(EditFormComponent);
          component = fixture.componentInstance;
          de = fixture.debugElement;
          component.data = {
            type: 'Kanji',
            item: {
              _id: '123',
              kanji: '日',
              meaning: ['day'],
              pronunciation: ['にち'],
              notes: 'notes',
              created_at: Date.now()
            }
          };
          fixture.detectChanges();
        });

        it('should be invalid 1', () => {
          component.form.controls?.['kanji'].setValue('');
          component.meaningFormArray.controls[0].setValue('hola');
          component.pronunciationFormArray.controls[0].setValue('あわわ');
          component.form.controls?.['notes'].setValue('');

          expect(component.form.valid).toBeFalsy();
          expect(component.form.controls?.['kanji'].valid).toBeFalsy();
          expect(component.meaningFormArray.controls[0].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[0].valid).toBeTruthy();
          expect(component.form.controls?.['notes'].valid).toBeTruthy();
          expect(component.form.controls?.['kanji'].errors?.['required']).toBeTruthy();
        });

        it('should be invalid 2', () => {
          component.form.controls?.['kanji'].setValue('日');
          component.meaningFormArray.controls[0].setValue('');
          component.pronunciationFormArray.controls[0].setValue('あわわ');
          component.form.controls?.['notes'].setValue('');

          expect(component.form.valid).toBeFalsy();
          expect(component.form.controls?.['kanji'].valid).toBeTruthy();
          expect(component.meaningFormArray.controls[0].valid).toBeFalsy();
          expect(component.pronunciationFormArray.controls[0].valid).toBeTruthy();
          expect(component.form.controls?.['notes'].valid).toBeTruthy();
          expect(component.meaningFormArray.controls[0].errors?.['required']).toBeTruthy();
        });

        it('should be invalid 3', () => {
          component.form.controls?.['kanji'].setValue('日月あ');
          component.meaningFormArray.controls[0].setValue('hola');
          component.pronunciationFormArray.controls[0].setValue('あわわ');
          component.addArrayEl(component.pronunciationFormArray, true, true);
          component.pronunciationFormArray.controls[1].setValue('test');
          component.form.controls?.['notes'].setValue('');

          expect(component.form.valid).toBeFalsy();
          expect(component.form.controls?.['kanji'].valid).toBeFalsy();
          expect(component.meaningFormArray.controls[0].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[0].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[1].valid).toBeFalsy();
          expect(component.form.controls?.['notes'].valid).toBeTruthy();
          expect(component.form.controls?.['kanji'].errors?.['maxlength']).toBeTruthy();
          expect(component.pronunciationFormArray.controls[1].errors?.['pattern']).toBeTruthy();
        });

        it('should be invalid 4', () => {
          component.form.controls?.['kanji'].setValue('a');
          component.meaningFormArray.controls[0].setValue('hola');
          component.pronunciationFormArray.controls[0].setValue('あわわ');
          component.addArrayEl(component.meaningFormArray);
          component.addArrayEl(component.meaningFormArray);
          component.addArrayEl(component.pronunciationFormArray, true, true);
          component.addArrayEl(component.pronunciationFormArray, true, true);
          component.meaningFormArray.controls[1].setValue('test');
          component.meaningFormArray.controls[2].setValue('a'.repeat(100));
          component.pronunciationFormArray.controls[1].setValue('test');
          component.pronunciationFormArray.controls[2].setValue('');
          component.form.controls?.['notes'].setValue('');

          expect(component.form.valid).toBeFalsy();
          expect(component.form.controls?.['kanji'].valid).toBeFalsy();
          expect(component.meaningFormArray.controls[0].valid).toBeTruthy();
          expect(component.meaningFormArray.controls[1].valid).toBeTruthy();
          expect(component.meaningFormArray.controls[2].valid).toBeFalsy();
          expect(component.pronunciationFormArray.controls[0].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[1].valid).toBeFalsy();
          expect(component.pronunciationFormArray.controls[2].valid).toBeFalsy();
          expect(component.form.controls?.['notes'].valid).toBeTruthy();

          expect(component.form.controls?.['kanji'].errors?.['pattern']).toBeTruthy();
          expect(component.meaningFormArray.controls[2].errors?.['maxlength']).toBeTruthy();
          expect(component.pronunciationFormArray.controls[1].errors?.['pattern']).toBeTruthy();
          expect(component.pronunciationFormArray.controls[2].errors?.['required']).toBeTruthy();
        });

        it('should be valid 1', () => {
          component.form.controls?.['kanji'].setValue('日');
          component.meaningFormArray.controls[0].setValue('hola');
          component.pronunciationFormArray.controls[0].setValue('あわわ');
          component.form.controls?.['notes'].setValue('');

          expect(component.form.valid).toBeTruthy();
        });

        it('should be valid 2', () => {
          component.form.controls?.['kanji'].setValue('月');
          component.meaningFormArray.controls[0].setValue('hola');
          component.pronunciationFormArray.controls[0].setValue('あわわ');
          component.addArrayEl(component.meaningFormArray);
          component.addArrayEl(component.pronunciationFormArray, true, true);
          component.meaningFormArray.controls[1].setValue('test');
          component.pronunciationFormArray.controls[1].setValue('え');
          component.form.controls?.['notes'].setValue('mis notas');

          expect(component.form.valid).toBeTruthy();
        });

      });

      describe('word type', () => {

        beforeEach(() => {
          fixture = TestBed.createComponent(EditFormComponent);
          component = fixture.componentInstance;
          de = fixture.debugElement;
          component.data = {
            type: 'Word',
            item: {
              _id: '123',
              word: 'お疲れ',
              meaning: ['tired'],
              pronunciation: ['おつかれ'],
              notes: 'notes',
              created_at: Date.now()
            }
          };
          fixture.detectChanges();
        });

        it('should be invalid 1', () => {
          component.form.controls?.['word'].setValue('');
          component.meaningFormArray.controls[0].setValue('hola');
          component.pronunciationFormArray.controls[0].setValue('あわわ');
          component.form.controls?.['notes'].setValue('');

          expect(component.form.valid).toBeFalsy();
          expect(component.form.controls?.['word'].valid).toBeFalsy();
          expect(component.meaningFormArray.controls[0].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[0].valid).toBeTruthy();
          expect(component.form.controls?.['notes'].valid).toBeTruthy();
          expect(component.form.controls?.['word'].errors?.['required']).toBeTruthy();
        });

        it('should be invalid 2', () => {
          component.form.controls?.['word'].setValue('a');
          component.meaningFormArray.controls[0].setValue('a'.repeat(100));
          component.pronunciationFormArray.controls[0].setValue('test');
          component.form.controls?.['notes'].setValue('');

          expect(component.form.valid).toBeFalsy();
          expect(component.form.controls?.['word'].valid).toBeFalsy();
          expect(component.meaningFormArray.controls[0].valid).toBeFalsy();
          expect(component.pronunciationFormArray.controls[0].valid).toBeFalsy();
          expect(component.form.controls?.['notes'].valid).toBeTruthy();
          expect(component.form.controls?.['word'].errors?.['pattern']).toBeTruthy();
          expect(component.meaningFormArray.controls[0].errors?.['maxlength']).toBeTruthy();
          expect(component.pronunciationFormArray.controls[0].errors?.['pattern']).toBeTruthy();
        });

        it('should be invalid 3', () => {
          component.form.controls?.['word'].setValue('日曜日');
          component.meaningFormArray.controls[0].setValue('hola');
          component.pronunciationFormArray.controls[0].setValue('あわわ');
          component.addArrayEl(component.meaningFormArray);
          component.addArrayEl(component.meaningFormArray);
          component.addArrayEl(component.pronunciationFormArray, true, true);
          component.addArrayEl(component.pronunciationFormArray, true, true);
          component.meaningFormArray.controls[1].setValue('');
          component.meaningFormArray.controls[2].setValue('test');
          component.pronunciationFormArray.controls[1].setValue('え');
          component.pronunciationFormArray.controls[2].setValue('');

          component.form.controls?.['notes'].setValue('aaaa');

          expect(component.form.valid).toBeFalsy();
          expect(component.form.controls?.['word'].valid).toBeTruthy();
          expect(component.meaningFormArray.controls[0].valid).toBeTruthy();
          expect(component.meaningFormArray.controls[1].valid).toBeFalsy();
          expect(component.meaningFormArray.controls[2].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[0].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[1].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[2].valid).toBeFalsy();
          expect(component.form.controls?.['notes'].valid).toBeTruthy();
          expect(component.meaningFormArray.controls[1].errors?.['required']).toBeTruthy();
          expect(component.pronunciationFormArray.controls[2].errors?.['required']).toBeTruthy();
          expect(component.meaningFormArray.length).toBe(3);
          expect(component.pronunciationFormArray.length).toBe(3);
        });

        it('should be valid 1', () => {
          component.form.controls?.['word'].setValue('日曜日');
          component.meaningFormArray.controls[0].setValue('hola');
          component.pronunciationFormArray.controls[0].setValue('あわわ');
          component.form.controls?.['notes'].setValue('');

          expect(component.form.valid).toBeTruthy();
        });

        it('should be valid 2', () => {
          component.form.controls?.['word'].setValue('日曜日');
          component.meaningFormArray.controls[0].setValue('hola');
          component.pronunciationFormArray.controls[0].setValue('あわわ');
          component.addArrayEl(component.meaningFormArray);
          component.addArrayEl(component.pronunciationFormArray, true, true);
          component.meaningFormArray.controls[1].setValue('test');
          component.pronunciationFormArray.controls[1].setValue('え');
          component.form.controls?.['notes'].setValue('mis notas');

          expect(component.form.valid).toBeTruthy();
          expect(component.meaningFormArray.length).toBe(2);
          expect(component.pronunciationFormArray.length).toBe(2);
        });

      });

    });

    describe('interface', () => {

      describe('kanji type', () => {

        beforeEach(() => {
          fixture = TestBed.createComponent(EditFormComponent);
          component = fixture.componentInstance;
          de = fixture.debugElement;
          service = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
          component.data = {
            type: 'Kanji',
            item: {
              _id: '123',
              kanji: '日',
              meaning: ['day'],
              pronunciation: ['にち'],
              notes: 'notes',
              created_at: new Date(),
            }
          };
          fixture.detectChanges();
        });

        it('should be invalid 1', () => {
          setInputValue(fixture, `#${component.type}`, '');
          setInputValue(fixture, '#meaning0', 'hola');
          //setInputValue(fixture, '#pronunciation0', 'あわわ');                           already saved pronunciations are not editable
          setInputValue(fixture, '#notes', 'aaaa');
          fixture.detectChanges();

          expect(component.form.valid).toBeFalsy();
          expect(component.form.controls?.['kanji'].errors?.['required']).toBeTruthy();
          expect(component.meaningFormArray.controls[0].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[0].valid).toBeTruthy();
          expect(component.form.controls?.['notes'].valid).toBeTruthy();
          expect(getText(fixture, '#kanji-required-error')).toContain('*');
        });

        it('should be invalid 2', () => {
          setInputValue(fixture, `#${component.type}`, '日曜日');
          setInputValue(fixture, '#meaning0', '');
          setInputValue(fixture, '#notes', 'aaaa');
          fixture.detectChanges();

          clickElement(fixture, '#meaning-add');
          clickElement(fixture, '#pronunciation-add');
          fixture.detectChanges();

          setInputValue(fixture, '#meaning1', 'hola');
          setInputValue(fixture, '#pronunciation1', 'a');
          fixture.detectChanges();

          expect(component.form.valid).toBeFalsy();
          expect(component.form.controls?.['kanji'].valid).toBeFalsy();
          expect(component.meaningFormArray.controls[0].valid).toBeFalsy();
          expect(component.meaningFormArray.controls[1].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[0].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[1].valid).toBeFalsy();
          expect(component.form.controls?.['notes'].valid).toBeTruthy();
          expect(component.form.controls?.['kanji'].errors?.['maxlength']).toBeTruthy();
          expect(component.meaningFormArray.controls[0].errors?.['required']).toBeTruthy();
          expect(component.pronunciationFormArray.controls[1].errors?.['pattern']).toBeTruthy();
          expect(component.meaningFormArray.length).toBe(2);
          expect(component.pronunciationFormArray.length).toBe(2);
          expect(getText(fixture, '#kanji-length-error')).toContain('*');
          expect(getText(fixture, '#meaning-required-error0')).toContain('*');
          expect(getText(fixture, '#pronunciation-pattern-error1')).toContain('*');
        });

        it('should be invalid 3', () => {
          setInputValue(fixture, `#${component.type}`, 'A');
          setInputValue(fixture, '#meaning0', 'hola'.repeat(20));
          setInputValue(fixture, '#notes', 'aaaa');
          fixture.detectChanges();

          clickElement(fixture, '#meaning-add');
          clickElement(fixture, '#meaning-add');
          clickElement(fixture, '#meaning-add');
          clickElement(fixture, '#pronunciation-add');
          clickElement(fixture, '#pronunciation-add');
          fixture.detectChanges();
          clickElement(fixture, '#pronunciation-remove0');
          clickElement(fixture, '#meaning-remove1');
          fixture.detectChanges();

          setInputValue(fixture, '#meaning1', 'hola');
          setInputValue(fixture, '#meaning2', 'awa');
          setInputValue(fixture, '#pronunciation0', 'あわ');
          setInputValue(fixture, '#pronunciation1', 'a');
          fixture.detectChanges();

          expect(component.form.valid).toBeFalsy();
          expect(component.form.controls?.['kanji'].valid).toBeFalsy();
          expect(component.meaningFormArray.controls[0].valid).toBeFalsy();
          expect(component.meaningFormArray.controls[1].valid).toBeTruthy();
          expect(component.meaningFormArray.controls[2].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[0].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[1].valid).toBeFalsy();
          expect(component.meaningFormArray.length).toBe(3);
          expect(component.pronunciationFormArray.length).toBe(2);
          expect(getText(fixture, '#kanji-pattern-error')).toContain('*');
          expect(getText(fixture, '#meaning-length-error0')).toContain('*');
          expect(getText(fixture, '#pronunciation-pattern-error1')).toContain('*');
        });

        it('should be valid', () => {
          setInputValue(fixture, `#${component.type}`, '日');
          fixture.detectChanges();
          setInputValue(fixture, `#${component.type}`, '');
          fixture.detectChanges();
          setInputValue(fixture, `#${component.type}`, '年');
          setInputValue(fixture, '#meaning0', '0');
          setInputValue(fixture, '#notes', 'kon');
          fixture.detectChanges();

          clickElement(fixture, '#meaning-add');
          clickElement(fixture, '#meaning-add');
          clickElement(fixture, '#meaning-add');
          clickElement(fixture, '#pronunciation-add');
          clickElement(fixture, '#pronunciation-add');
          clickElement(fixture, '#pronunciation-add');
          fixture.detectChanges();

          setInputValue(fixture, '#meaning1', '1');
          setInputValue(fixture, '#meaning2', '2');
          setInputValue(fixture, '#meaning3', '3');
          setInputValue(fixture, '#pronunciation1', 'いち');
          setInputValue(fixture, '#pronunciation2', 'に');
          setInputValue(fixture, '#pronunciation3', 'さん');
          fixture.detectChanges();

          clickElement(fixture, '#meaning-remove0');
          clickElement(fixture, '#meaning-remove2');
          clickElement(fixture, '#pronunciation-remove0');
          fixture.detectChanges();

          expect(component.form.valid).toBeTruthy();
          expect(component.meaningFormArray.length).toBe(2);
          expect(component.pronunciationFormArray.length).toBe(3);
        });

        describe('submit + spies + misc', () => {
          it('should submit valid', () => {
            service.updateKanji.and.returnValue(mockObservable({
              _id: '123',
              kanji: '日',
              meaning: ['day'],
              pronunciation: ['にち'],
              notes: 'notes',
              created_at: new Date()
            }));

            clickElement(fixture, '#submit');
            fixture.detectChanges();

            expect(service.updateKanji).toHaveBeenCalled();
            expect(service.updateKanji.calls.count()).toBe(1);
            expect(service.updateKanji.calls.argsFor(0)).toEqual([{
              kanji: component.form.controls?.['kanji'].value,
              meaning: component.meaningFormArray.controls.map((control: AbstractControl) => control.value),
              pronunciation: component.pronunciationFormArray.controls.map((control: AbstractControl) => control.value),
              notes: component.form.controls?.['notes'].value
            }, component.data.item._id]);
          });

          it('should submit invalid', () => {
            setInputValue(fixture, `#${component.type}`, 'a');
            setInputValue(fixture, '#meaning0', '');
            fixture.detectChanges();

            clickElement(fixture, '#submit');
            fixture.detectChanges();

            expect(service.updateKanji).not.toHaveBeenCalled();
            expect(component.form.valid).toBeFalsy();
            expect(component.form.controls?.['kanji'].valid).toBeFalsy();
            expect(component.meaningFormArray.controls[0].valid).toBeFalsy();
            expect(component.pronunciationFormArray.controls[0].valid).toBeTruthy();
            expect(getText(fixture, '#kanji-pattern-error')).toContain('*');
            expect(getText(fixture, '#meaning-required-error0')).toContain('*');
          });

          it('should submit valid but rejected', fakeAsync(() => {
            service.updateKanji.and.returnValue(asyncError({ error: 'error general' }));

            clickElement(fixture, '#submit');
            fixture.detectChanges();

            expect(component.status).toEqual('loading');

            tick();
            fixture.detectChanges();

            expect(service.updateKanji).toHaveBeenCalled();
            expect(component.status).toEqual('error');
            expect(component.errorInfo).toEqual('error general');
          }));
        });

      });

      describe('word type', () => {

        beforeEach(() => {
          fixture = TestBed.createComponent(EditFormComponent);
          component = fixture.componentInstance;
          de = fixture.debugElement;
          service = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
          component.data = {
            type: 'Word',
            item: {
              _id: '123',
              word: 'お疲れ',
              meaning: ['tired'],
              pronunciation: ['おつかれ'],
              notes: 'notes',
              created_at: Date.now()
            }
          };
          fixture.detectChanges();
        });

        it('should be invalid 1', () => {
          setInputValue(fixture, `#${component.type}`, '');
          setInputValue(fixture, '#meaning0', '');
          fixture.detectChanges();

          expect(component.form.valid).toBeFalsy();
          expect(component.form.controls?.['word'].valid).toBeFalsy();
          expect(component.meaningFormArray.controls[0].valid).toBeFalsy();
          expect(component.pronunciationFormArray.controls[0].valid).toBeTruthy();
          expect(component.form.controls?.['word'].errors?.['required']).toBeTruthy();
          expect(component.meaningFormArray.controls[0].errors?.['required']).toBeTruthy();
          expect(getText(fixture, '#word-required-error')).toContain('*');
          expect(getText(fixture, '#meaning-required-error0')).toContain('*');
        });

        it('should be invalid 2', () => {
          setInputValue(fixture, `#${component.type}`, 'A');
          setInputValue(fixture, '#meaning0', 'hola'.repeat(20));
          setInputValue(fixture, '#notes', 'aaaa');
          fixture.detectChanges();

          clickElement(fixture, '#meaning-add');
          clickElement(fixture, '#meaning-add');
          clickElement(fixture, '#meaning-add');
          clickElement(fixture, '#pronunciation-add');
          clickElement(fixture, '#pronunciation-add');
          fixture.detectChanges();
          clickElement(fixture, '#pronunciation-remove0');
          clickElement(fixture, '#meaning-remove1');
          fixture.detectChanges();

          setInputValue(fixture, '#meaning1', 'hola');
          setInputValue(fixture, '#meaning2', 'awa');
          setInputValue(fixture, '#pronunciation0', 'あわ');
          setInputValue(fixture, '#pronunciation1', 'a');
          fixture.detectChanges();

          expect(component.form.valid).toBeFalsy();
          expect(component.form.controls?.['word'].valid).toBeFalsy();
          expect(component.meaningFormArray.controls[0].valid).toBeFalsy();
          expect(component.meaningFormArray.controls[1].valid).toBeTruthy();
          expect(component.meaningFormArray.controls[2].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[0].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[1].valid).toBeFalsy();
          expect(component.meaningFormArray.length).toBe(3);
          expect(component.pronunciationFormArray.length).toBe(2);
          expect(getText(fixture, '#word-pattern-error')).toContain('*');
          expect(getText(fixture, '#meaning-length-error0')).toContain('*');
          expect(getText(fixture, '#pronunciation-pattern-error1')).toContain('*');
        });

        it('should be invalid 3', () => {
          setInputValue(fixture, `#${component.type}`, '日'.repeat(100));
          setInputValue(fixture, '#meaning0', 'hola'.repeat(20));
          setInputValue(fixture, '#notes', 'aaaa');
          fixture.detectChanges();

          clickElement(fixture, '#meaning-add');
          clickElement(fixture, '#meaning-add');
          clickElement(fixture, '#meaning-add');
          clickElement(fixture, '#pronunciation-add');
          clickElement(fixture, '#pronunciation-add');
          fixture.detectChanges();
          clickElement(fixture, '#pronunciation-remove0');
          clickElement(fixture, '#meaning-remove1');
          fixture.detectChanges();

          setInputValue(fixture, '#meaning1', 'hola');
          setInputValue(fixture, '#meaning2', 'awa');
          setInputValue(fixture, '#pronunciation0', 'あわ');
          setInputValue(fixture, '#pronunciation1', 'a');
          fixture.detectChanges();

          expect(component.form.valid).toBeFalsy();
          expect(component.form.controls?.['word'].valid).toBeFalsy();
          expect(component.meaningFormArray.controls[0].valid).toBeFalsy();
          expect(component.meaningFormArray.controls[1].valid).toBeTruthy();
          expect(component.meaningFormArray.controls[2].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[0].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[1].valid).toBeFalsy();
          expect(component.meaningFormArray.length).toBe(3);
          expect(component.pronunciationFormArray.length).toBe(2);
          expect(getText(fixture, '#word-length-error')).toContain('*');
          expect(getText(fixture, '#meaning-length-error0')).toContain('*');
          expect(getText(fixture, '#pronunciation-pattern-error1')).toContain('*');
        });

        it('should be valid', () => {
          setInputValue(fixture, `#${component.type}`, '日');
          setInputValue(fixture, '#meaning0', 'hola');
          setInputValue(fixture, '#notes', 'aaaa');
          fixture.detectChanges();

          clickElement(fixture, '#meaning-add');
          clickElement(fixture, '#meaning-add');
          clickElement(fixture, '#meaning-add');
          clickElement(fixture, '#pronunciation-add');
          clickElement(fixture, '#pronunciation-add');
          fixture.detectChanges();
          clickElement(fixture, '#pronunciation-remove0');
          clickElement(fixture, '#meaning-remove1');
          fixture.detectChanges();

          setInputValue(fixture, '#meaning1', 'hola');
          setInputValue(fixture, '#meaning2', 'awa');
          setInputValue(fixture, '#pronunciation0', 'あわ');
          setInputValue(fixture, '#pronunciation1', 'あわあわ');
          fixture.detectChanges();

          expect(component.form.valid).toBeTruthy();
          expect(component.form.controls?.['word'].valid).toBeTruthy();
          expect(component.meaningFormArray.controls[0].valid).toBeTruthy();
          expect(component.meaningFormArray.controls[1].valid).toBeTruthy();
          expect(component.meaningFormArray.controls[2].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[0].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[1].valid).toBeTruthy();
          expect(component.meaningFormArray.length).toBe(3);
          expect(component.pronunciationFormArray.length).toBe(2);
        });

        describe('submit + spies + misc', () => {
          it('should submit valid', () => {
            service.updateWord.and.returnValue(mockObservable({
              _id: '123',
              word: 'お疲れ',
              meaning: ['tired'],
              pronunciation: ['おつかれ'],
              notes: 'notes',
              created_at: new Date()
            }));

            clickElement(fixture, '#submit');
            fixture.detectChanges();

            expect(service.updateWord).toHaveBeenCalled();
            expect(service.updateWord.calls.count()).toBe(1);
            expect(service.updateWord.calls.argsFor(0)).toEqual([{
              word: component.form.controls?.['word'].value,
              meaning: component.meaningFormArray.controls.map((control: AbstractControl) => control.value),
              pronunciation: component.pronunciationFormArray.controls.map((control: AbstractControl) => control.value),
              notes: component.form.controls?.['notes'].value
            }, component.data.item._id]);
          });

          it('should submit invalid', () => {
            setInputValue(fixture, `#${component.type}`, 'a');
            setInputValue(fixture, '#meaning0', '');
            fixture.detectChanges();

            clickElement(fixture, '#submit');
            fixture.detectChanges();

            expect(service.updateKanji).not.toHaveBeenCalled();
            expect(component.form.valid).toBeFalsy();
            expect(component.form.controls?.['word'].valid).toBeFalsy();
            expect(component.meaningFormArray.controls[0].valid).toBeFalsy();
            expect(component.pronunciationFormArray.controls[0].valid).toBeTruthy();
            expect(getText(fixture, '#word-pattern-error')).toContain('*');
            expect(getText(fixture, '#meaning-required-error0')).toContain('*');
          });

          it('should submit valid but rejected', fakeAsync(() => {
            service.updateWord.and.returnValue(asyncError({ error: 'error general' }));

            clickElement(fixture, '#submit');
            fixture.detectChanges();

            expect(component.status).toEqual('loading');

            tick();
            fixture.detectChanges();

            expect(service.updateWord).toHaveBeenCalled();
            expect(component.status).toEqual('error');
            expect(component.errorInfo).toEqual('error general');
          }));
        });
      });

    });

  });

});
