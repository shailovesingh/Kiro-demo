export interface User {
  id: number;
  name: string;
  email?: string;
}

export class UserService {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  // BUG (DEMO-2): Crashes with TypeError when a user has no email.
  // Accessing .toLowerCase() on undefined throws:
  // "Cannot read properties of undefined (reading 'toLowerCase')"
  getUserEmail(id: number): string {
    const user = this.users.find((u) => u.id === id);
    return user!.email.toLowerCase();
  }

  getUserById(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  getAllUsers(): User[] {
    return [...this.users];
  }
}
