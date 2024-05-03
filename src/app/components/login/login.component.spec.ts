import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LoginComponent } from './login.component';
import { DataService } from './../../../app/services/data.service';
import { query, getText, setInputValue, clickElement, mockObservable, asyncError } from './../../../testing/helpers';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let service: jasmine.SpyObj<DataService>;                                           // spy step 1

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DataService', ['login']);                  // spy step 2

    await TestBed.configureTestingModule({
    imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        FontAwesomeModule,
        LoginComponent
    ],
    providers: [
        { provide: DataService, useValue: spy } // spy step 3
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;          // spy step 4
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial form state', () => {

    it('should have an empty "username" input', () => {
      const usernameInput = query(fixture, '#username');
      expect(usernameInput.nativeElement.value).toEqual('');
    });

    it('should have an empty "password" input', () => {
      const passwordInput = query(fixture, '#password');
      expect(passwordInput.nativeElement.value).toEqual('');
    });
  });

  describe('form validity', () => {

    describe('programatically', () => {

      describe('username', () => {

        let usernameInput: AbstractControl;

        beforeEach(() => {
          usernameInput = component.form.controls?.['username'];
        });

        it('should be invalid if "username" input is empty', () => {
          usernameInput.setValue('');
          expect(usernameInput.hasError('required')).toBeTruthy();
        });

        it('should be invalid if "username" input is longer than 64 characters', () => {
          usernameInput.setValue('lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis orci non tellus maximus, in rutrum velit hendrerit. 12312312312312312312312312313');
          expect(usernameInput.hasError('maxlength')).toBeTruthy();
        });

        it('should be valid', () => {
          usernameInput.setValue('TestUser');
          expect(usernameInput.valid).toBeTruthy();
        });

      });


      describe('password', () => {

        let passwordInput: AbstractControl;

        beforeEach(() => {
          passwordInput = component.form.controls?.['password'];
        });

        it('should be invalid if "username" input is empty', () => {
          passwordInput.setValue('');
          expect(passwordInput.hasError('required')).toBeTruthy();
        });

        it('should be invalid if "username" input is longer than 64 characters', () => {
          passwordInput.setValue('lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis orci non tellus maximus, in rutrum velit hendrerit. 12312312312312312312312312313');
          expect(passwordInput.hasError('maxlength')).toBeTruthy();
        });

        it('should be valid', () => {
          passwordInput.setValue('TestPassword');
          expect(passwordInput.valid).toBeTruthy();
        });

      });



      describe('full form', () => {

        let usernameInput: AbstractControl;
        let passwordInput: AbstractControl;

        beforeEach(() => {
          usernameInput = component.form.controls?.['username'];
          passwordInput = component.form.controls?.['password'];
        });

        it('should be invalid if form is empty', () => {
          expect(component.form.invalid).toBeTruthy();
        });

        it('should be invalid CASE 1', () => {
          usernameInput.setValue('TestUser');
          passwordInput.setValue('');
          expect(component.form.invalid).toBeTruthy();
          expect(passwordInput.invalid).toBeTruthy();
        });

        it('should be invalid CASE 2', () => {
          usernameInput.setValue('');
          passwordInput.setValue('TestPassword');
          expect(component.form.invalid).toBeTruthy();
          expect(usernameInput.invalid).toBeTruthy();
        });

        it('should be invalid CASE 3', () => {
          usernameInput.setValue('TestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUser');
          passwordInput.setValue('TestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPassword');
          expect(component.form.invalid).toBeTruthy();
          expect(usernameInput.invalid).toBeTruthy();
          expect(passwordInput.invalid).toBeTruthy();
        });

        it('should be valid CASE 1', () => {
          usernameInput.setValue('TestUser');
          passwordInput.setValue('TestPassword');
          expect(component.form.valid).toBeTruthy();
        });

        it('should be valid CASE 2', () => {
          usernameInput.setValue('Admin');
          passwordInput.setValue('admin123');
          expect(component.form.valid).toBeTruthy();
        });

      });

    });

    describe('interface', () => {

      describe('username', () => {

        it('should be invalid required', () => {
          setInputValue(fixture, '#username', '');
          fixture.detectChanges();
          const textError = getText(fixture, '#username-required-error');

          expect(component.form.invalid).toBeTruthy();
          expect(component.form.hasError('required', 'username')).toBeTruthy();
          expect(textError).toContain('required');
        });

        it('should be invalid length', () => {
          setInputValue(fixture, '#username', 'TestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUserTestUser');
          fixture.detectChanges();
          const textError = getText(fixture, '#username-length-error');

          expect(component.form.invalid).toBeTruthy();
          expect(component.form.hasError('maxlength', 'username')).toBeTruthy();
          expect(textError).toContain('long');
        });

        it('should be valid', () => {
          setInputValue(fixture, '#username', 'Admin');
          fixture.detectChanges();
          expect(component.form.controls?.['username'].valid).toBeTruthy();
        });

      });


      describe('password', () => {

        it('should be invalid required', () => {
          setInputValue(fixture, '#password', '');
          fixture.detectChanges();
          const textError = getText(fixture, '#password-required-error');

          expect(component.form.invalid).toBeTruthy();
          expect(component.form.hasError('required', 'password')).toBeTruthy();
          expect(textError).toContain('required');
        });

        it('should be invalid length', () => {
          setInputValue(fixture, '#password', 'TestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPasswordTestPassword');
          fixture.detectChanges();
          const textError = getText(fixture, '#password-length-error');

          expect(component.form.invalid).toBeTruthy();
          expect(component.form.hasError('maxlength', 'password')).toBeTruthy();
          expect(textError).toContain('long');
        });

        it('should be valid', () => {
          setInputValue(fixture, '#password', 'admin123');
          fixture.detectChanges();
          expect(component.form.controls?.['password'].valid).toBeTruthy();
        });

      });


      describe('full form + submit + spy service', () => {

        it('should be valid 1', () => {
          setInputValue(fixture, '#username', 'Admin');
          setInputValue(fixture, '#password', 'admin123');
          fixture.detectChanges();

          expect(component.form.valid).toBeTruthy();

          service.login.and.returnValue(mockObservable({
            token: '1234567890',
            user: {
              username: 'Admin',
              password: 'admin123'
            }
          }));

          clickElement(fixture, '.submit');
          fixture.detectChanges();

          expect(service.login).toHaveBeenCalled();
        });

        it('should be valid 2', () => {
          setInputValue(fixture, '#username', 'myuser');
          setInputValue(fixture, '#password', 'confindential');
          fixture.detectChanges();

          expect(component.form.valid).toBeTruthy();

          service.login.and.returnValue(mockObservable({
            token: '1234567890',
            user: {
              username: 'myuser',
              password: 'confindential'
            }
          }));

          clickElement(fixture, '.submit');
          fixture.detectChanges();

          expect(service.login).toHaveBeenCalled();
        });

        it('should be valid but rejected', fakeAsync(() => {
          setInputValue(fixture, '#username', 'TestUser');
          setInputValue(fixture, '#password', 'TestPassword');
          fixture.detectChanges();

          expect(component.form.valid).toBeTruthy();

          service.login.and.returnValue(asyncError({
            status: 401,
            statusText: 'Unauthorized'
          }));

          clickElement(fixture, '.submit');
          fixture.detectChanges();

          expect(component.status).toEqual('loading');

          tick();
          fixture.detectChanges();

          expect(service.login).toHaveBeenCalled();
          expect(component.status).toEqual('error');
        }));

        it('should be invalid', () => {
          setInputValue(fixture, '#username', '');
          setInputValue(fixture, '#password', 'uwu');
          fixture.detectChanges();

          expect(component.form.invalid).toBeTruthy();

          clickElement(fixture, '.submit');
          fixture.detectChanges();

          expect(service.login).not.toHaveBeenCalled();
          // expect(component.status).toEqual('error');
        });

      });

    });

  });

});
