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

  // FIX (DEMO-2): Handle undefined email gracefully.
  getUserEmail(id: number): string {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new Error(`UserService.getUserEmail: User with ID ${id} not found`);
    }
    return user.email?.toLowerCase() ?? '';
  }

  getUserById(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  getAllUsers(): User[] {
    return [...this.users];
  }
}
