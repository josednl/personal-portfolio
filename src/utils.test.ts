// Simple test to verify Vitest is working
describe('basic math', () => {
  test('2 + 2 equals 4', () => {
    expect(2 + 2).toBe(4);
  });

  test('basic string operations', () => {
    expect('hello').toContain('hell');
    expect('world').not.toContain('xyz');
  });
});