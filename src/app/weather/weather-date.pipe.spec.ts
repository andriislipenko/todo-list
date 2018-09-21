import { WeatherDatePipe } from './weather-date.pipe';

describe('WeatherDatePipe', () => {
  it('create an instance', () => {
    const pipe = new WeatherDatePipe();
    expect(pipe).toBeTruthy();
  });
});
