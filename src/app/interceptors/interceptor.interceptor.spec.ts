import { TestBed } from '@angular/core/testing';

import { MyInterceptor } from './interceptor.interceptor';
import { SpinnerComponent } from '@components/spinner/spinner.component';

describe('InterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [SpinnerComponent],
    providers: [
        MyInterceptor
    ]
}));

  it('should be created', () => {
    const interceptor: MyInterceptor = TestBed.inject(MyInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
