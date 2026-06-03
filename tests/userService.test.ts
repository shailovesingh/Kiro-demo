import { UserService } from '../src/userService';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  // ── addUser & getUserById (these PASS before the fix) ────────────────────

  test('should add a user and retrieve them by ID', () => {
    service.addUser({ id: 1, name: 'Alice', email: 'alice@example.com' });
    expect(service.getUserById(1)).toEqual({
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
    });
  });

  test('should return undefined for a non-existent user ID', () => {
    expect(service.getUserById(999)).toBeUndefined();
  });

  test('should return all users', () => {
    service.addUser({ id: 1, name: 'Alice', email: 'alice@example.com' });
    service.addUser({ id: 2, name: 'Bob' });
    expect(service.getAllUsers()).toHaveLength(2);
  });

  // ── getUserEmail (these FAIL before DEMO-2 is fixed) ─────────────────────

  test('should return lowercase email when user has an email', () => {
    service.addUser({ id: 1, name: 'Alice', email: 'Alice@Example.COM' });
    expect(service.getUserEmail(1)).toBe('alice@example.com');
  });

  test('should return empty string when user has no email', () => {
    service.addUser({ id: 2, name: 'Bob' });
    expect(service.getUserEmail(2)).toBe('');
  });

  test('should throw a descriptive error when user is not found', () => {
    expect(() => service.getUserEmail(999)).toThrow(
      'UserService.getUserEmail: User with ID 999 not found'
    );
  });
});
