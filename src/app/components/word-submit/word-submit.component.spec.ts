import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { WordSubmitComponent } from './word-submit.component';
import { SpinnerComponent } from './../spinner/spinner.component';
import { DataService } from './../../../app/services/data.service';
import { query, getText, setInputValue, clickElement, mockObservable, asyncError } from './../../../testing/helpers';

describe('WordSubmitComponent', () => {
  let component: WordSubmitComponent;
  let fixture: ComponentFixture<WordSubmitComponent>;
  let de: DebugElement;
  let service: jasmine.SpyObj<DataService>;                                           // spy step 1

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DataService', ['createWord']);                  // spy step 2

    await TestBed.configureTestingModule({
    imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        FontAwesomeModule,
        WordSubmitComponent, SpinnerComponent
    ],
    providers: [
        { provide: DataService, useValue: spy }, // spy step 3
    ],
})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordSubmitComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;             // spy step 4
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial form state', () => {

    it('should have an empty "word" input', () => {
      const wordInput = query(fixture, '#word');
      expect(wordInput.nativeElement.value).toEqual('');
    });

    it('should have a "meaning" array', () => {
      expect(component.meaningFormArray.length).toEqual(1);
    });

    it('should have a "pronunciation" array', () => {
      expect(component.pronunciationFormArray.length).toEqual(1);
    });

    it('should have an empty "notes" input', () => {
      const notesInput = query(fixture, '#notes');
      expect(notesInput.nativeElement.value).toEqual('');
    });

  });


  describe('form validity', () => {

    describe('programatically', () => {

      describe('word', () => {

        let wordInput: AbstractControl;

        beforeEach(() => {
          wordInput = component.form.controls?.['word'];
        });

        it('should be invalid if "word" input is empty', () => {
          wordInput.setValue('');
          expect(wordInput.hasError('required')).toBeTruthy();
        });

        it('should be invalid if "word" input is longer than 64 charactes', () => {
          wordInput.setValue('日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語');
          expect(wordInput.hasError('maxlength')).toBeTruthy();
        });

        it('should be invalid if "word" input is not a in japanese', () => {
          wordInput.setValue('Hello');
          expect(wordInput.hasError('pattern')).toBeTruthy();
        });

        it('should be valid', () => {
          wordInput.setValue('日本語');
          expect(wordInput.valid).toBeTruthy();
        });

      });

      describe('meaning', () => {

        let meaningInput0: AbstractControl;

        beforeEach(() => {
          meaningInput0 = component.meaningFormArray.controls[0];
        });

        it('should be invalid if "meaning" array has any empty values', () => {
          meaningInput0.setValue('');
          expect(meaningInput0.hasError('required')).toBeTruthy();
        });

        it('should be invalid if "meaning" array has any values longer than 64 characters', () => {
          meaningInput0.setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis orci non tellus maximus, in rutrum velit hendrerit.');
          expect(meaningInput0.hasError('maxlength')).toBeTruthy();
        });

        it('should be valid if "meaning" array has a valid meaning', () => {
          meaningInput0.setValue('park');
          expect(meaningInput0.valid).toBeTruthy();
          expect(component.meaningFormArray.valid).toBeTruthy();
        });

        it('should be valid if "meaning" array has multiple valid meanings', () => {
          component.addArrayEl(component.meaningFormArray);
          component.addArrayEl(component.meaningFormArray);
          const meaningInput1 = component.meaningFormArray.controls[1];
          const meaningInput2 = component.meaningFormArray.controls[2];
          meaningInput0.setValue('park');
          meaningInput1.setValue('garden');
          meaningInput2.setValue('yard');
          expect(meaningInput0.valid).toBeTruthy();
          expect(meaningInput1.valid).toBeTruthy();
          expect(meaningInput2.valid).toBeTruthy();
          expect(component.meaningFormArray.valid).toBeTruthy();
        });

        it('should be invalid if "meaning" array has at least one invalid meaning', () => {
          component.addArrayEl(component.meaningFormArray);
          component.addArrayEl(component.meaningFormArray);
          const meaningInput1 = component.meaningFormArray.controls[1];
          const meaningInput2 = component.meaningFormArray.controls[2];
          meaningInput0.setValue('park');
          meaningInput1.setValue('');
          meaningInput2.setValue('yard');
          expect(meaningInput0.valid).toBeTruthy();
          expect(meaningInput1.valid).toBeFalsy();
          expect(meaningInput2.valid).toBeTruthy();
          expect(component.meaningFormArray.valid).toBeFalsy();
        });

        it('should be valid CASE 1', () => {
          component.removeArrayEl(component.meaningFormArray, 0);
          component.addArrayEl(component.meaningFormArray);
          component.addArrayEl(component.meaningFormArray);
          component.addArrayEl(component.meaningFormArray);
          const meaningInput0 = component.meaningFormArray.controls[0];         // define again because the array has changed
          const meaningInput1 = component.meaningFormArray.controls[1];
          const meaningInput2 = component.meaningFormArray.controls[2];
          meaningInput0.setValue('にち');
          meaningInput1.setValue('よな');
          meaningInput2.setValue('ひろ');
          component.removeArrayEl(component.meaningFormArray, 1);
          expect(component.meaningFormArray.length).toBe(2);
          expect(component.meaningFormArray.valid).toBeTruthy();
        });

        it('should be valid CASE 2', () => {
          component.removeArrayEl(component.meaningFormArray, 0);
          component.addArrayEl(component.meaningFormArray);
          component.meaningFormArray.controls[0].setValue('123');
          component.removeArrayEl(component.meaningFormArray, 0);
          component.addArrayEl(component.meaningFormArray);
          component.meaningFormArray.controls[0].setValue('Hola');
          component.removeArrayEl(component.meaningFormArray, 0);
          component.addArrayEl(component.meaningFormArray);
          component.meaningFormArray.controls[0].setValue('Chau');
          component.addArrayEl(component.meaningFormArray);
          component.meaningFormArray.controls[1].setValue('Meaning');
          component.addArrayEl(component.meaningFormArray);
          component.meaningFormArray.controls[2].setValue('test');
          expect(component.meaningFormArray.length).toBe(3);
          expect(component.meaningFormArray.valid).toBeTruthy();
        });

      });

      describe('pronunciation', () => {

        let pronunciationInput0: AbstractControl;

        beforeEach(() => {
          pronunciationInput0 = component.pronunciationFormArray.controls[0];
        });

        it('should be invalid if "pronunciation" array has any empty values', () => {
          pronunciationInput0.setValue('');
          expect(pronunciationInput0.hasError('required')).toBeTruthy();
        });

        it('should be invalid if "pronunciation" array has any values with non japanese characters', () => {
          pronunciationInput0.setValue('ABC');
          expect(pronunciationInput0.hasError('pattern')).toBeTruthy();
        });

        it('should be invalid if "pronunciation" array has any values longer than 64 characters', () => {
          pronunciationInput0.setValue('亜英欧亜叡王積んンんンンンハハハハハはああああああああああああいいいいおいおいおいおいおいおいおいおいおいおいおいおいおいおいおいおいおいいおいおえいおえいおえいおあいえおあいおえいあおえいおあいえおいうあえおいうあおえいうあいおえうあおいえうあおいうえおい');
          expect(pronunciationInput0.hasError('maxlength')).toBeTruthy();
        });

        it('should be valid if "pronunciation" array has a valid meaning', () => {
          pronunciationInput0.setValue('にち');
          expect(pronunciationInput0.valid).toBeTruthy();
          expect(component.pronunciationFormArray.valid).toBeTruthy();
        });

        it('should be valid if "pronunciation" array has multiple valid pronunciations', () => {
          component.addArrayEl(component.pronunciationFormArray, true);
          component.addArrayEl(component.pronunciationFormArray, true);
          const pronunciationInput1 = component.pronunciationFormArray.controls[1];
          const pronunciationInput2 = component.pronunciationFormArray.controls[2];
          pronunciationInput0.setValue('にち');
          pronunciationInput1.setValue('よな');
          pronunciationInput2.setValue('ひろ');
          expect(pronunciationInput0.valid).toBeTruthy();
          expect(pronunciationInput1.valid).toBeTruthy();
          expect(pronunciationInput2.valid).toBeTruthy();
          expect(component.pronunciationFormArray.valid).toBeTruthy();
        });

        it('should be invalid if "pronunciation" array has at least one invalid pronunciation', () => {
          component.addArrayEl(component.pronunciationFormArray, true);
          component.addArrayEl(component.pronunciationFormArray, true);
          const pronunciationInput1 = component.pronunciationFormArray.controls[1];
          const pronunciationInput2 = component.pronunciationFormArray.controls[2];
          pronunciationInput0.setValue('にち');
          pronunciationInput1.setValue('hola');
          pronunciationInput2.setValue('ひろ');
          expect(pronunciationInput0.valid).toBeTruthy();
          expect(pronunciationInput1.valid).toBeFalsy();
          expect(pronunciationInput2.valid).toBeTruthy();
          expect(component.pronunciationFormArray.valid).toBeFalsy();
        });

        it('should be valid CASE 1', () => {
          component.removeArrayEl(component.pronunciationFormArray, 0);
          component.addArrayEl(component.pronunciationFormArray, true);
          component.addArrayEl(component.pronunciationFormArray, true);
          component.addArrayEl(component.pronunciationFormArray, true);
          const pronunciationInput0 = component.pronunciationFormArray.controls[0];
          const pronunciationInput1 = component.pronunciationFormArray.controls[1];
          const pronunciationInput2 = component.pronunciationFormArray.controls[2];
          pronunciationInput0.setValue('にち');
          pronunciationInput1.setValue('よな');
          pronunciationInput2.setValue('ひろ');
          component.removeArrayEl(component.pronunciationFormArray, 1);
          expect(component.pronunciationFormArray.length).toBe(2);
          expect(component.pronunciationFormArray.valid).toBeTruthy();
        });

        it('should be valid CASE 2', () => {
          component.removeArrayEl(component.pronunciationFormArray, 0);
          component.addArrayEl(component.pronunciationFormArray, true);
          component.pronunciationFormArray.controls[0].setValue('にち');
          component.removeArrayEl(component.pronunciationFormArray, 0);
          component.addArrayEl(component.pronunciationFormArray, true);
          component.pronunciationFormArray.controls[0].setValue('Hola');
          component.removeArrayEl(component.pronunciationFormArray, 0);
          component.addArrayEl(component.pronunciationFormArray, true);
          component.pronunciationFormArray.controls[0].setValue('あばば');
          component.addArrayEl(component.pronunciationFormArray, true);
          component.pronunciationFormArray.controls[1].setValue('にち');
          component.addArrayEl(component.pronunciationFormArray, true);
          component.pronunciationFormArray.controls[2].setValue('よな');
          expect(component.pronunciationFormArray.length).toBe(3);
          expect(component.pronunciationFormArray.valid).toBeTruthy();
        });

      });

      describe('notes', () => {

        let notesInput: AbstractControl;

        beforeEach(() => {
          notesInput = component.form.controls?.['notes'];
        });

        it('should be valid if notes is empty', () => {
          notesInput.setValue('');
          expect(notesInput.valid).toBeTruthy();
        });

        it('should be valid if notes is filled', () => {
          notesInput.setValue('Example: 私の名前はゆいです。(My name is Yui)');
          expect(notesInput.valid).toBeTruthy();
        });

      });

      describe('full form', () => {

        let wordInput: AbstractControl;
        let meaningInput0: AbstractControl;
        let pronunciationInput0: AbstractControl;
        let notesInput: AbstractControl;

        beforeEach(() => {
          wordInput = component.form.controls?.['word'];
          meaningInput0 = component.meaningFormArray.controls[0];
          pronunciationInput0 = component.pronunciationFormArray.controls[0];
          notesInput = component.form.controls?.['notes'];
        });

        it('should be invalid if form is empty', () => {
          expect(component.form.invalid).toBeTruthy();
        });

        it('should be invalid CASE 1', () => {
          component.addArrayEl(component.pronunciationFormArray, true);
          const pronunciationInput1 = component.pronunciationFormArray.controls[1];
          wordInput.setValue('日本語');
          meaningInput0.setValue('day');
          pronunciationInput0.setValue('にち');
          pronunciationInput1.setValue('hola');
          expect(component.form.invalid).toBeTruthy();
          expect(pronunciationInput1.invalid).toBeTruthy();
        });

        it('should be invalid CASE 2', () => {
          wordInput.setValue('お誕生日');
          meaningInput0.setValue('');
          pronunciationInput0.setValue('にち');
          expect(component.form.invalid).toBeTruthy();
          expect(meaningInput0.invalid).toBeTruthy();
        });

        it('should be invalid CASE 3', () => {
          wordInput.setValue('How');
          meaningInput0.setValue('Day');
          pronunciationInput0.setValue('にち');
          expect(component.form.invalid).toBeTruthy();
          expect(wordInput.invalid).toBeTruthy();
        });

        it('should be valid CASE 1', () => {
          wordInput.setValue('金曜日');
          meaningInput0.setValue('Day');
          pronunciationInput0.setValue('にち');
          notesInput.setValue('Test');
          expect(component.form.valid).toBeTruthy();
        });

        it('should be valid CASE 2', () => {
          component.addArrayEl(component.meaningFormArray);
          component.addArrayEl(component.meaningFormArray);
          const meaningInput1 = component.meaningFormArray.controls[1];
          const meaningInput2 = component.meaningFormArray.controls[2];
          component.addArrayEl(component.pronunciationFormArray, true);
          component.addArrayEl(component.pronunciationFormArray, true);
          component.addArrayEl(component.pronunciationFormArray, true);
          const pronunciationInput1 = component.pronunciationFormArray.controls[1];
          const pronunciationInput2 = component.pronunciationFormArray.controls[2];
          const pronunciationInput3 = component.pronunciationFormArray.controls[3];
          wordInput.setValue('中国人');
          meaningInput0.setValue('Day');
          meaningInput1.setValue('Sun');
          meaningInput2.setValue('Japan');
          pronunciationInput0.setValue('にち');
          pronunciationInput1.setValue('ぼし');
          pronunciationInput2.setValue('ひろ');
          pronunciationInput3.setValue('がつ');
          notesInput.setValue('');
          expect(component.form.valid).toBeTruthy();
        });

        it('should be valid CASE 3', () => {
          component.addArrayEl(component.meaningFormArray);
          const meaningInput1 = component.meaningFormArray.controls[1];
          wordInput.setValue('うどん');
          meaningInput0.setValue('You');
          meaningInput1.setValue('Mr.');
          pronunciationInput0.setValue('きみ');
          notesInput.setValue('My notes');
          expect(component.form.valid).toBeTruthy();
        });

      });

    });

    describe('interface', () => {

      describe('word', () => {

        it('should be invalid pattern', () => {
          setInputValue(fixture, '#word', 'Sup');
          fixture.detectChanges();
          const textError = getText(fixture, '#word-pattern-error');

          expect(component.form.invalid).toBeTruthy();
          expect(component.form.hasError('pattern', 'word')).toBeTruthy();
          expect(textError).toContain('japanese');
        });

        it('should be invalid required', () => {
          setInputValue(fixture, '#word', '');
          fixture.detectChanges();
          const textError = getText(fixture, '#word-required-error');

          expect(component.form.invalid).toBeTruthy();
          expect(component.form.hasError('required', 'word')).toBeTruthy();
          expect(textError).toContain('required');
        });

        it('should be invalid length', () => {
          setInputValue(fixture, '#word', '月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日月曜日');
          fixture.detectChanges();
          const textError = getText(fixture, '#word-length-error');

          expect(component.form.invalid).toBeTruthy();
          expect(component.form.hasError('maxlength', 'word')).toBeTruthy();
          expect(textError).toContain('*');
        });

        it('should be valid', () => {
          setInputValue(fixture, '#word', '月曜日');
          fixture.detectChanges();
          expect(component.form.controls?.['word'].valid).toBeTruthy();
        });

      });

      describe('meaning', () => {

        it('should be invalid required single', () => {
          setInputValue(fixture, '#meaning0', '');
          fixture.detectChanges();
          const textError = getText(fixture, '#meaning-required-error0');

          expect(component.form.invalid).toBeTruthy();
          expect(component.meaningFormArray.controls[0].hasError('required')).toBeTruthy();
          expect(component.meaningFormArray.invalid).toBeTruthy();
          expect(textError).toContain('required');
        });

        it('should be invalid required multiple', () => {
          setInputValue(fixture, '#meaning0', 'Day');
          clickElement(fixture, '#meaning-add');
          clickElement(fixture, '#meaning-add');
          clickElement(fixture, '#meaning-add');
          fixture.detectChanges();
          setInputValue(fixture, '#meaning1', '');
          setInputValue(fixture, '#meaning2', 'Sun');
          setInputValue(fixture, '#meaning3', '');
          fixture.detectChanges();
          const textError1 = getText(fixture, '#meaning-required-error1');
          const textError3 = getText(fixture, '#meaning-required-error3');

          expect(component.form.invalid).toBeTruthy();
          expect(component.meaningFormArray.invalid).toBeTruthy();
          expect(component.meaningFormArray.controls[1].hasError('required')).toBeTruthy();
          expect(textError1).toContain('required');
          expect(component.meaningFormArray.controls[3].hasError('required')).toBeTruthy();
          expect(textError3).toContain('required');
          expect(component.meaningFormArray.controls[0].valid).toBeTruthy();
          expect(component.meaningFormArray.controls[2].valid).toBeTruthy();
        });

        it('should be invalid length', () => {
          setInputValue(fixture, '#meaning0', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis orci non tellus maximus, in rutrum velit hendrerit.');
          fixture.detectChanges();
          const textError = getText(fixture, '#meaning-length-error0');

          expect(component.form.invalid).toBeTruthy();
          expect(component.meaningFormArray.controls[0].hasError('maxlength')).toBeTruthy();
          expect(component.meaningFormArray.invalid).toBeTruthy();
          expect(textError).toContain('long');
        });

        it('should be valid', () => {
          setInputValue(fixture, '#meaning0', 'Day');
          clickElement(fixture, '#meaning-add');
          fixture.detectChanges();
          setInputValue(fixture, '#meaning1', 'Sun');
          fixture.detectChanges();

          expect(component.meaningFormArray.valid).toBeTruthy();
        });

        it('should test remove btns', () => {
          setInputValue(fixture, '#meaning0', 'Day');
          clickElement(fixture, '#meaning-add');
          fixture.detectChanges();
          setInputValue(fixture, '#meaning1', 'Sun');
          fixture.detectChanges();
          clickElement(fixture, '#meaning-remove0');
          fixture.detectChanges();

          expect(component.meaningFormArray.controls[0].valid).toBeTruthy();
          expect(component.meaningFormArray.controls[0].value).toEqual('Sun');
          expect(component.meaningFormArray.controls[1]).toBeUndefined();
          expect(component.meaningFormArray.valid).toBeTruthy();
        });

      });

      describe('pronunciation', () => {

        it('should be invalid required single', () => {
          setInputValue(fixture, '#pronunciation0', '');
          fixture.detectChanges();
          const textError = getText(fixture, '#pronunciation-required-error0');

          expect(component.form.invalid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[0].hasError('required')).toBeTruthy();
          expect(component.pronunciationFormArray.invalid).toBeTruthy();
          expect(textError).toContain('required');
        });

        it('should be invalid required multiple', () => {
          setInputValue(fixture, '#pronunciation0', 'にち');
          clickElement(fixture, '#pronunciation-add');
          clickElement(fixture, '#pronunciation-add');
          clickElement(fixture, '#pronunciation-add');
          fixture.detectChanges();
          setInputValue(fixture, '#pronunciation1', '');
          setInputValue(fixture, '#pronunciation2', 'がつ');
          setInputValue(fixture, '#pronunciation3', '');
          fixture.detectChanges();
          const textError1 = getText(fixture, '#pronunciation-required-error1');
          const textError3 = getText(fixture, '#pronunciation-required-error3');

          expect(component.form.invalid).toBeTruthy();
          expect(component.pronunciationFormArray.invalid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[1].hasError('required')).toBeTruthy();
          expect(textError1).toContain('required');
          expect(component.pronunciationFormArray.controls[3].hasError('required')).toBeTruthy();
          expect(textError3).toContain('required');
          expect(component.pronunciationFormArray.controls[0].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[2].valid).toBeTruthy();
        });

        it('should be invalid length', () => {
          setInputValue(fixture, '#pronunciation0', 'ああお栄青江五百井亜上青いうえ負いあう英オア上井おうあえいおうあおいえうあおいえうおいあえういおうあえおいうあえおいうあえおいうあえおいうあえおいうあえおいうあえおいうあえおいうあえおいうあえおいうあおいうあえおいうあえおいうあえ');
          fixture.detectChanges();
          const textError = getText(fixture, '#pronunciation-length-error0');

          expect(component.form.invalid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[0].hasError('maxlength')).toBeTruthy();
          expect(component.pronunciationFormArray.invalid).toBeTruthy();
          expect(textError).toContain('long');
        });

        it('should be invalid pattern', () => {
          setInputValue(fixture, '#pronunciation0', 'Hello');
          fixture.detectChanges();
          const textError = getText(fixture, '#pronunciation-pattern-error0');

          expect(component.form.invalid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[0].hasError('pattern')).toBeTruthy();
          expect(component.pronunciationFormArray.invalid).toBeTruthy();
          expect(textError).toContain('hiragana');
        });

        it('should be valid', () => {
          setInputValue(fixture, '#pronunciation0', 'にち');
          clickElement(fixture, '#pronunciation-add');
          fixture.detectChanges();
          setInputValue(fixture, '#pronunciation1', 'がつ');
          fixture.detectChanges();

          expect(component.pronunciationFormArray.controls[0].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[1].valid).toBeTruthy();
          expect(component.pronunciationFormArray.valid).toBeTruthy();
        });

        it('should test remove btns', () => {
          setInputValue(fixture, '#pronunciation0', 'にち');
          clickElement(fixture, '#pronunciation-add');
          fixture.detectChanges();
          setInputValue(fixture, '#pronunciation1', 'がつ');
          fixture.detectChanges();
          clickElement(fixture, '#pronunciation-remove0');
          fixture.detectChanges();

          expect(component.pronunciationFormArray.controls[0].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[0].value).toEqual('がつ');
          expect(component.pronunciationFormArray.controls[1]).toBeUndefined();
          expect(component.pronunciationFormArray.valid).toBeTruthy();
        });

      });

      describe('notes', () => {

        it('should be valid 1', () => {
          setInputValue(fixture, '#notes', '');
          fixture.detectChanges();

          expect(component.form.controls?.['notes'].valid).toBeTruthy();
        });

        it('should be valid 2', () => {
          setInputValue(fixture, '#notes', 'Hello my notes uwu');
          fixture.detectChanges();

          expect(component.form.controls?.['notes'].valid).toBeTruthy();
        });

      });

      describe('full form + submit + spy service', () => {

        it('should be valid 1', () => {
          setInputValue(fixture, '#word', '日曜日');
          setInputValue(fixture, '#meaning0', 'Day');
          clickElement(fixture, '#meaning-add');
          fixture.detectChanges();
          setInputValue(fixture, '#meaning1', 'Sun');
          setInputValue(fixture, '#pronunciation0', 'にち');
          clickElement(fixture, '#pronunciation-add');
          fixture.detectChanges();
          setInputValue(fixture, '#pronunciation1', 'がつ');
          setInputValue(fixture, '#notes', 'Hello my notes uwu');
          fixture.detectChanges();

          expect(component.form.valid).toBeTruthy();

          service.createWord.and.returnValue(mockObservable({
            _id: '1',
            word: '日曜日',
            meaning: ['Day', 'Sun'],
            pronunciation: ['にち', 'がつ'],
            notes: 'Hello my notes uwu',
            created_at: new Date()
          }));

          clickElement(fixture, '#submit');
          fixture.detectChanges();

          expect(service.createWord).toHaveBeenCalled();
        });

        it('should be valid 2', () => {
          setInputValue(fixture, '#word', '水曜日');
          setInputValue(fixture, '#meaning0', 'Day');
          setInputValue(fixture, '#pronunciation0', 'にち');
          setInputValue(fixture, '#notes', '');
          fixture.detectChanges();

          expect(component.form.valid).toBeTruthy();

          service.createWord.and.returnValue(mockObservable({
            _id: '2',
            word: '水曜日',
            meaning: ['Day'],
            pronunciation: ['にち'],
            notes: '',
            created_at: new Date()
          }));

          clickElement(fixture, '#submit');
          fixture.detectChanges();

          expect(service.createWord).toHaveBeenCalled();
        });

        it('should be valid but rejected', fakeAsync(() => {
          setInputValue(fixture, '#word', '日曜日');
          setInputValue(fixture, '#meaning0', 'Day');
          setInputValue(fixture, '#pronunciation0', 'にち');
          setInputValue(fixture, '#notes', '');
          fixture.detectChanges();

          expect(component.form.valid).toBeTruthy();

          service.createWord.and.returnValue(asyncError({
            word: '日曜日',
            meaning: ['Day'],
            pronunciation: ['にち'],
            notes: '',
          }))

          clickElement(fixture, '#submit');
          fixture.detectChanges();

          expect(component.status).toEqual('loading');

          tick();
          fixture.detectChanges();

          expect(service.createWord).toHaveBeenCalled();
          expect(component.status).toEqual('error');
        }));

        it('should be invalid', () => {
          setInputValue(fixture, '#word', '');
          setInputValue(fixture, '#meaning0', 'Day');
          setInputValue(fixture, '#pronunciation0', 'にち');
          setInputValue(fixture, '#notes', '');
          fixture.detectChanges();

          expect(component.form.invalid).toBeTruthy();

          clickElement(fixture, '#submit');
          fixture.detectChanges();

          expect(service.createWord).not.toHaveBeenCalled();
          expect(component.status).toEqual('error');
        });

      });

      describe('reset', () => {

        it('should reset', () => {
          setInputValue(fixture, '#word', 'てすと');
          setInputValue(fixture, '#meaning0', 'Day');
          clickElement(fixture, '#meaning-add');
          fixture.detectChanges();
          setInputValue(fixture, '#meaning1', 'Sun');
          setInputValue(fixture, '#pronunciation0', 'にち');
          clickElement(fixture, '#pronunciation-add');
          fixture.detectChanges();
          setInputValue(fixture, '#pronunciation1', 'がつ');
          setInputValue(fixture, '#notes', 'Hello my notes uwu');
          fixture.detectChanges();
          clickElement(fixture, '#reset');
          fixture.detectChanges();

          expect(component.form.invalid).toBeTruthy();
          expect(component.form.value).toEqual({
            word: null,
            meaning: [''],
            pronunciation: [''],
            notes: null
          });

        });

      });

    });

  });

});
