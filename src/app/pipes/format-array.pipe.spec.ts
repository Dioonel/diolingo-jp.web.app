import { FormatArrayPipe } from './format-array.pipe';

describe('FormatArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new FormatArrayPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return an empty string when an empty array is provided', () => {
    const pipe = new FormatArrayPipe();
    expect(pipe.transform([])).toBe('');
  });

  it('should return a string with the values separated by a comma', () => {
    const pipe = new FormatArrayPipe();
    expect(pipe.transform(['a', 'b', 'c'])).toBe('a, b, c');
  });
});
