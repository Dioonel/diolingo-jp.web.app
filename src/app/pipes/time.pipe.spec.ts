import { TimePipe } from './time.pipe';

describe('TimePipe', () => {
  it('create an instance', () => {
    const pipe = new TimePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform 0 seconds', () => {
    const pipe = new TimePipe();
    expect(pipe.transform(0)).toBe('0 seconds');
  });

  it('should transform 1 second', () => {
    const pipe = new TimePipe();
    expect(pipe.transform(1)).toBe('1 second');
  });

  it('should transform 59 seconds', () => {
    const pipe = new TimePipe();
    expect(pipe.transform(59)).toBe('59 seconds');
  });

  it('should transform 60 seconds', () => {
    const pipe = new TimePipe();
    expect(pipe.transform(60)).toBe('1 minute');
  });

  it('should transform 100 seconds', () => {
    const pipe = new TimePipe();
    expect(pipe.transform(100)).toBe('1 minute and 40 seconds');
  });

  it('should transform 3600 seconds', () => {
    const pipe = new TimePipe();
    expect(pipe.transform(3600)).toBe('1 hour');
  });

  it('should transform 8600 seconds', () => {
    const pipe = new TimePipe();
    expect(pipe.transform(8600)).toBe('2 hours and 23 minutes');
  });
});
