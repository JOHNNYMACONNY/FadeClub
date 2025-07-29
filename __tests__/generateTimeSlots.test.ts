import { generateTimeSlots } from '../components/booking/TimePreferenceSelector';

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2023-01-03T00:00:00Z'));
});

afterAll(() => {
  jest.useRealTimers();
});

describe('generateTimeSlots', () => {
  it('slots span 14 days starting from tomorrow excluding Sundays and Mondays', () => {
    const slots = generateTimeSlots();
    const dates = Array.from(new Set(slots.map(s => s.date)));

    const tomorrow = new Date('2023-01-04T00:00:00Z');
    const in14Days = new Date('2023-01-17T00:00:00Z');

    expect(dates[0]).toBe(tomorrow.toISOString().split('T')[0]);
    expect(dates[dates.length - 1]).toBe(in14Days.toISOString().split('T')[0]);

    // there should be no Sundays (0) or Mondays (1)
    const dayNumbers = dates.map(d => new Date(d).getDay());
    expect(dayNumbers.every(day => day !== 0 && day !== 1)).toBe(true);

    // Should cover exactly 10 business days in this range
    expect(dates.length).toBe(10);
  });
});
