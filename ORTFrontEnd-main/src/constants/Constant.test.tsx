import { Roles, UserType } from '../constants'; // Adjust the import path accordingly

describe('Roles and UserType', () => {
  test('Roles array should have correct length', () => {
    expect(Roles.length).toBe(4); // Ensure there are 4 roles defined
  });

  test('UserType object should have correct keys', () => {
    expect(UserType).toHaveProperty('superAdmin');
    expect(UserType).toHaveProperty('admin');
    expect(UserType).toHaveProperty('student');
    expect(UserType).toHaveProperty('teacher');
  });

  test('UserType values should match expected strings', () => {
    expect(UserType.superAdmin).toBe('superAdmin');
    expect(UserType.admin).toBe('admin');
    expect(UserType.student).toBe('student');
    expect(UserType.teacher).toBe('teacher');
  });
});
