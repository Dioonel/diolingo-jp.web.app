import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KanjiSubmitComponent } from './kanji-submit.component';
import { DataService } from './../../../app/services/data.service';
import { query, getText, setInputValue, clickElement } from './../../../testing/helpers';

fdescribe('KanjiSubmitComponent', () => {
  let component: KanjiSubmitComponent;
  let fixture: ComponentFixture<KanjiSubmitComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KanjiSubmitComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [DataService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanjiSubmitComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial form state', () => {

    it('should have an empty "kanji" input', () => {
      const kanjiInput = de.query(By.css('#kanji')).nativeElement;
      expect(kanjiInput.value).toEqual('');
    });

    it('should have a "meaning" array', () => {
      expect(component.meaningFormArray.length).toEqual(1);
    });

    it('should have a "pronunciation" array', () => {
      expect(component.pronunciationFormArray.length).toEqual(1);
    });

    it('should have an empty "notes" input', () => {
      const notesInput = de.query(By.css('#notes')).nativeElement;
      expect(notesInput.value).toEqual('');
    });

  });


  describe('form validity', () => {

    describe('programatically', () => {

      describe('kanji', () => {

        it('should be invalid if "kanji" input is empty', () => {
          const kanjiInput = component.form.controls?.['kanji'];
          kanjiInput.setValue('');
          expect(kanjiInput.errors?.['required']).toBeTruthy();
        });

        it('should be invalid if "kanji" input is longer than 1 character', () => {
          const kanjiInput = component.form.controls?.['kanji'];
          kanjiInput.setValue('日本語');
          expect(kanjiInput.errors?.['maxlength']).toBeTruthy();
        });

        it('should be invalid if "kanji" input is not a kanji character', () => {
          const kanjiInput = component.form.controls?.['kanji'];
          kanjiInput.setValue('A');
          expect(kanjiInput.errors?.['pattern']).toBeTruthy();
        });

        it('should be valid if "kanji" input is a single kanji character', () => {
          const kanjiInput = component.form.controls?.['kanji'];
          kanjiInput.setValue('日');
          expect(kanjiInput.valid).toBeTruthy();
        });

      });

      describe('meaning', () => {

        it('should be invalid if "meaning" array has any empty values', () => {
          const meaningInput = component.meaningFormArray.controls[0];
          meaningInput.setValue('');
          expect(meaningInput.errors?.['required']).toBeTruthy();
        });

        it('should be invalid if "meaning" array has any values longer than 64 characters', () => {
          const meaningInput = component.meaningFormArray.controls[0];
          meaningInput.setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis orci non tellus maximus, in rutrum velit hendrerit.');
          expect(meaningInput.errors?.['maxlength']).toBeTruthy();
        });

        it('should be valid if "meaning" array has a valid meaning', () => {
          const meaningInput = component.meaningFormArray.controls[0];
          meaningInput.setValue('park');
          expect(meaningInput.valid).toBeTruthy();
          expect(component.meaningFormArray.valid).toBeTruthy();
        });

        it('should be valid if "meaning" array has multiple valid meanings', () => {
          component.addArrayEl(component.meaningFormArray);
          component.addArrayEl(component.meaningFormArray);
          const meaningInput0 = component.meaningFormArray.controls[0];
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
          const meaningInput0 = component.meaningFormArray.controls[0];
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
          const meaningInput0 = component.meaningFormArray.controls[0];
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

        it('should be invalid if "pronunciation" array has any empty values', () => {
          const pronunciationInput = component.pronunciationFormArray.controls[0];
          pronunciationInput.setValue('');
          expect(pronunciationInput.errors?.['required']).toBeTruthy();
        });

        it('should be invalid if "pronunciation" array has any values with non japanese characters', () => {
          const pronunciationInput = component.pronunciationFormArray.controls[0];
          pronunciationInput.setValue('ABC');
          expect(pronunciationInput.errors?.['pattern']).toBeTruthy();
        });

        it('should be invalid if "pronunciation" array has any values longer than 64 characters', () => {
          const pronunciationInput = component.pronunciationFormArray.controls[0];
          pronunciationInput.setValue('亜英欧亜叡王積んンんンンンハハハハハはああああああああああああいいいいおいおいおいおいおいおいおいおいおいおいおいおいおいおいおいおいおいいおいおえいおえいおえいおあいえおあいおえいあおえいおあいえおいうあえおいうあおえいうあいおえうあおいえうあおいうえおい');
          expect(pronunciationInput.errors?.['maxlength']).toBeTruthy();
        });

        it('should be valid if "pronunciation" array has a valid meaning', () => {
          const pronunciationInput = component.pronunciationFormArray.controls[0];
          pronunciationInput.setValue('にち');
          expect(pronunciationInput.valid).toBeTruthy();
          expect(component.pronunciationFormArray.valid).toBeTruthy();
        });

        it('should be valid if "pronunciation" array has multiple valid pronunciations', () => {
          component.addArrayEl(component.pronunciationFormArray, true);
          component.addArrayEl(component.pronunciationFormArray, true);
          const pronunciationInput0 = component.pronunciationFormArray.controls[0];
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
          const pronunciationInput0 = component.pronunciationFormArray.controls[0];
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

        it('should be valid if notes is empty', () => {
          const notesInput = component.form.controls?.['notes'];
          notesInput.setValue('');
          expect(notesInput.valid).toBeTruthy();
        });

        it('should be valid if notes is filled', () => {
          const notesInput = component.form.controls?.['notes'];
          notesInput.setValue('Example: 私の名前はゆいです。(My name is Yui)');
          expect(notesInput.valid).toBeTruthy();
        });

      });

      describe('full form', () => {

        it('should be invalid if form is empty', () => {
          expect(component.form.invalid).toBeTruthy();
        });

        it('should be invalid CASE 1', () => {
          const kanjiInput = component.form.controls?.['kanji'];
          const meaningInput = component.meaningFormArray.controls[0];
          component.addArrayEl(component.pronunciationFormArray, true);
          const pronunciationInput0 = component.pronunciationFormArray.controls[0];
          const pronunciationInput1 = component.pronunciationFormArray.controls[1];
          kanjiInput.setValue('日');
          meaningInput.setValue('day');
          pronunciationInput0.setValue('にち');
          pronunciationInput1.setValue('hola');
          expect(component.form.invalid).toBeTruthy();
        });

        it('should be invalid CASE 2', () => {
          const kanjiInput = component.form.controls?.['kanji'];
          const meaningInput = component.meaningFormArray.controls[0];
          const pronunciationInput0 = component.pronunciationFormArray.controls[0];
          kanjiInput.setValue('日');
          meaningInput.setValue('');
          pronunciationInput0.setValue('にち');
          expect(component.form.invalid).toBeTruthy();
        });

        it('should be invalid CASE 3', () => {
          const kanjiInput = component.form.controls?.['kanji'];
          const meaningInput = component.meaningFormArray.controls[0];
          const pronunciationInput0 = component.pronunciationFormArray.controls[0];
          kanjiInput.setValue('T');
          meaningInput.setValue('Day');
          pronunciationInput0.setValue('にち');
          expect(component.form.invalid).toBeTruthy();
        });

        it('should be valid CASE 1', () => {
          const kanjiInput = component.form.controls?.['kanji'];
          const meaningInput = component.meaningFormArray.controls[0];
          const pronunciationInput0 = component.pronunciationFormArray.controls[0];
          const notesInput = component.form.controls?.['notes'];
          kanjiInput.setValue('日');
          meaningInput.setValue('Day');
          pronunciationInput0.setValue('にち');
          notesInput.setValue('Test');
          expect(component.form.valid).toBeTruthy();
        });

        it('should be valid CASE 2', () => {
          const kanjiInput = component.form.controls?.['kanji'];
          component.addArrayEl(component.meaningFormArray);
          component.addArrayEl(component.meaningFormArray);
          const meaningInput0 = component.meaningFormArray.controls[0];
          const meaningInput1 = component.meaningFormArray.controls[1];
          const meaningInput2 = component.meaningFormArray.controls[2];
          component.addArrayEl(component.pronunciationFormArray, true);
          component.addArrayEl(component.pronunciationFormArray, true);
          component.addArrayEl(component.pronunciationFormArray, true);
          const pronunciationInput0 = component.pronunciationFormArray.controls[0];
          const pronunciationInput1 = component.pronunciationFormArray.controls[1];
          const pronunciationInput2 = component.pronunciationFormArray.controls[2];
          const pronunciationInput3 = component.pronunciationFormArray.controls[3];
          const notesInput = component.form.controls?.['notes'];
          kanjiInput.setValue('日');
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
          const kanjiInput = component.form.controls?.['kanji'];
          component.addArrayEl(component.meaningFormArray);
          const meaningInput0 = component.meaningFormArray.controls[0];
          const meaningInput1 = component.meaningFormArray.controls[1];
          const pronunciationInput0 = component.pronunciationFormArray.controls[0];
          const notesInput = component.form.controls?.['notes'];
          kanjiInput.setValue('君');
          meaningInput0.setValue('You');
          meaningInput1.setValue('Mr.');
          pronunciationInput0.setValue('きみ');
          notesInput.setValue('My notes');
          expect(component.form.valid).toBeTruthy();
        });

      });

    });

    describe('interface', () => {

      describe('kanji', () => {

        it('should be invalid pattern', () => {
          setInputValue(fixture, '#kanji', 'T');
          fixture.detectChanges();
          const textError = getText(fixture, 'kanji-pattern-error', true);

          expect(component.form.invalid).toBeTruthy();
          expect(component.form.controls?.['kanji'].invalid).toBeTruthy();
          expect(component.form.hasError('pattern', 'kanji')).toBeTruthy();
          expect(textError).toContain('must be a kanji');
        });

        it('should be invalid required', () => {
          setInputValue(fixture, '#kanji', '');
          fixture.detectChanges();
          const textError = getText(fixture, 'kanji-required-error', true);

          expect(component.form.invalid).toBeTruthy();
          expect(component.form.controls?.['kanji'].invalid).toBeTruthy();
          expect(component.form.hasError('required', 'kanji')).toBeTruthy();
          expect(textError).toContain('required');
        });

        it('should be invalid length', () => {
          setInputValue(fixture, '#kanji', '月曜日');
          fixture.detectChanges();
          const textError = getText(fixture, 'kanji-length-error', true);

          expect(component.form.invalid).toBeTruthy();
          expect(component.form.controls?.['kanji'].invalid).toBeTruthy();
          expect(component.form.hasError('maxlength', 'kanji')).toBeTruthy();
          expect(textError).toContain('*');
        });

        it('should be valid', () => {
          setInputValue(fixture, '#kanji', '月');
          fixture.detectChanges();
          expect(component.form.controls?.['kanji'].valid).toBeTruthy();
        });

      });

      describe('meaning', () => {

        it('should be invalid required single', () => {
          setInputValue(fixture, '#meaning0', '');
          fixture.detectChanges();
          const textError = getText(fixture, '#meaning-required-error0');

          expect(component.form.invalid).toBeTruthy();
          expect(component.meaningFormArray.controls[0].invalid).toBeTruthy();
          expect(component.meaningFormArray.controls[0].hasError('required')).toBeTruthy();
          expect(textError).toContain('required');
        });

        it('should be invalid required multiple', () => {
          setInputValue(fixture, '#meaning0', 'Day');
          clickElement(fixture, 'meaning-add', true);
          clickElement(fixture, 'meaning-add', true);
          clickElement(fixture, 'meaning-add', true);
          fixture.detectChanges();
          setInputValue(fixture, '#meaning1', '');
          setInputValue(fixture, '#meaning2', 'Sun');
          setInputValue(fixture, '#meaning3', '');
          fixture.detectChanges();
          const textError1 = getText(fixture, '#meaning-required-error1');
          const textError3 = getText(fixture, '#meaning-required-error3');

          expect(component.form.invalid).toBeTruthy();
          expect(component.meaningFormArray.controls[1].invalid).toBeTruthy();
          expect(component.meaningFormArray.controls[1].hasError('required')).toBeTruthy();
          expect(textError1).toContain('required');
          expect(component.meaningFormArray.controls[3].invalid).toBeTruthy();
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
          expect(component.meaningFormArray.controls[0].invalid).toBeTruthy();
          expect(component.meaningFormArray.controls[0].hasError('maxlength')).toBeTruthy();
          expect(textError).toContain('long');
        });

        it('should be valid', () => {
          setInputValue(fixture, '#meaning0', 'Day');
          clickElement(fixture, 'meaning-add', true);
          fixture.detectChanges();
          setInputValue(fixture, '#meaning1', 'Sun');
          fixture.detectChanges();
          expect(component.meaningFormArray.controls[0].valid).toBeTruthy();
          expect(component.meaningFormArray.controls[1].valid).toBeTruthy();
          expect(component.meaningFormArray.valid).toBeTruthy();
        });

        it('should test remove btns', () => {
          setInputValue(fixture, '#meaning0', 'Day');
          clickElement(fixture, 'meaning-add', true);
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
          expect(component.pronunciationFormArray.controls[0].invalid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[0].hasError('required')).toBeTruthy();
          expect(textError).toContain('required');
        });

        it('should be invalid required multiple', () => {
          setInputValue(fixture, '#pronunciation0', 'にち');
          clickElement(fixture, 'pronunciation-add', true);
          clickElement(fixture, 'pronunciation-add', true);
          clickElement(fixture, 'pronunciation-add', true);
          fixture.detectChanges();
          setInputValue(fixture, '#pronunciation1', '');
          setInputValue(fixture, '#pronunciation2', 'がつ');
          setInputValue(fixture, '#pronunciation3', '');
          fixture.detectChanges();
          const textError1 = getText(fixture, '#pronunciation-required-error1');
          const textError3 = getText(fixture, '#pronunciation-required-error3');

          expect(component.form.invalid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[1].invalid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[1].hasError('required')).toBeTruthy();
          expect(textError1).toContain('required');
          expect(component.pronunciationFormArray.controls[3].invalid).toBeTruthy();
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
          expect(component.pronunciationFormArray.controls[0].invalid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[0].hasError('maxlength')).toBeTruthy();
          expect(textError).toContain('long');
        });

        it('should be invalid pattern', () => {
          setInputValue(fixture, '#pronunciation0', 'Hello');
          fixture.detectChanges();
          const textError = getText(fixture, '#pronunciation-pattern-error0');

          expect(component.form.invalid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[0].invalid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[0].hasError('pattern')).toBeTruthy();
          expect(textError).toContain('hiragana');
        });

        it('should be valid', () => {
          setInputValue(fixture, '#pronunciation0', 'にち');
          clickElement(fixture, 'pronunciation-add', true);
          fixture.detectChanges();
          setInputValue(fixture, '#pronunciation1', 'がつ');
          fixture.detectChanges();

          expect(component.pronunciationFormArray.controls[0].valid).toBeTruthy();
          expect(component.pronunciationFormArray.controls[1].valid).toBeTruthy();
          expect(component.pronunciationFormArray.valid).toBeTruthy();
        });

        it('should test remove btns', () => {
          setInputValue(fixture, '#pronunciation0', 'にち');
          clickElement(fixture, 'pronunciation-add', true);
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

      describe('full form', () => {

        it('should be valid 1', () => {
          setInputValue(fixture, '#kanji', '日');
          setInputValue(fixture, '#meaning0', 'Day');
          clickElement(fixture, 'meaning-add', true);
          fixture.detectChanges();
          setInputValue(fixture, '#meaning1', 'Sun');
          setInputValue(fixture, '#pronunciation0', 'にち');
          clickElement(fixture, 'pronunciation-add', true);
          fixture.detectChanges();
          setInputValue(fixture, '#pronunciation1', 'がつ');
          setInputValue(fixture, '#notes', 'Hello my notes uwu');
          fixture.detectChanges();

          expect(component.form.valid).toBeTruthy();
        });

        it('should be valid 2', () => {
          setInputValue(fixture, '#kanji', '日');
          setInputValue(fixture, '#meaning0', 'Day');
          setInputValue(fixture, '#pronunciation0', 'にち');
          setInputValue(fixture, '#notes', '');
          fixture.detectChanges();

          expect(component.form.valid).toBeTruthy();
        });

      });

      describe('reset', () => {

        it('should reset', () => {
          setInputValue(fixture, '#kanji', '日');
          setInputValue(fixture, '#meaning0', 'Day');
          clickElement(fixture, 'meaning-add', true);
          fixture.detectChanges();
          setInputValue(fixture, '#meaning1', 'Sun');
          setInputValue(fixture, '#pronunciation0', 'にち');
          clickElement(fixture, 'pronunciation-add', true);
          fixture.detectChanges();
          setInputValue(fixture, '#pronunciation1', 'がつ');
          setInputValue(fixture, '#notes', 'Hello my notes uwu');
          fixture.detectChanges();
          clickElement(fixture, '.reset');
          fixture.detectChanges();

          expect(component.form.invalid).toBeTruthy();
          expect(component.form.value).toEqual({
            kanji: null,
            meaning: [null],
            pronunciation: [null],
            notes: null
          });

        });

      });

    });

  });

});
