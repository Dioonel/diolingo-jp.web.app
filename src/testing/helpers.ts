import { defer, of } from 'rxjs';
import { Type, DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncError(error: unknown) {
  return defer(() => Promise.reject(error));
}

export function mockObservable<T>(data: T) {
  return of(data);
}

export function mockPromise<T>(data: T) {
  return Promise.resolve(data);
}

export function clickEvent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId: boolean = false,
  event: unknown = null
) {
  let element;
  if (withTestId) {
    element = queryById(fixture, selector);
  } else {
    element = query(fixture, selector);
  }
  element.triggerEventHandler('click', event);
}

export function clickElement<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId: boolean = false
) {
  let elementDebug;
  if (withTestId) {
    elementDebug = queryById(fixture, selector);
  } else {
    elementDebug = query(fixture, selector);
  }
  const element: HTMLElement = elementDebug.nativeElement;
  element.click();
}

export function getText<T>(fixture: ComponentFixture<T>, selector: string, withTestId: boolean = false) {
  let debugElement;
  if (withTestId) {
    debugElement = queryById(fixture, selector);
  } else {
    debugElement = query(fixture, selector);
  }
  const element: HTMLElement = debugElement.nativeElement;
  return element.textContent;
}

export function query<T>(fixture: ComponentFixture<T>, selector: string) {
  const debugElement = fixture.debugElement.query(By.css(selector));
  if (!debugElement) {
    throw new Error(`query: Element with ${selector} not found`);
  }
  return debugElement;
}

export function queryById<T>(fixture: ComponentFixture<T>, testId: string) {
  const selector = `[data-testid="${testId}"]`;
  return query(fixture, selector);
}

export function queryAll<T>(fixture: ComponentFixture<T>, selector: string) {
  return fixture.debugElement.queryAll(By.css(selector));
}

export function queryAllByDirective<T, D>(fixture: ComponentFixture<T>, directive: Type<D>) {
  return fixture.debugElement.queryAll(By.directive(directive));
}

export function setInputValue<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  value: string,
  withTestId: boolean = false
) {
  let debugElement: DebugElement;
  if (withTestId) {
    debugElement = queryById(fixture, selector);
  } else {
    debugElement = query(fixture, selector);
  }
  const inputEl: HTMLInputElement = debugElement.nativeElement;
  inputEl.value = value;
  inputEl.dispatchEvent(new Event('input'));
  inputEl.dispatchEvent(new Event('blur'));
}
