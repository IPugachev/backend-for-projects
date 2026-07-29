import type { User } from "../types/user.ts";

class UserService {
    private users: User[] = [];

    getAll(): User[] {
        return this.users;
    }

    getById(id: number): User | undefined {
        return this.users.find((user) => user.id === id);
    }

    create(data: Omit<User, "id">): User {
        const user: User = {
            id: Date.now(),
            ...data,
        };

        this.users.push(user);

        return user;
    }

    update(
        id: number,
        data: Partial<User>,
    ): User | undefined {
        const user = this.getById(id);

        if (!user) return undefined;

        Object.assign(user, data);

        return user;
    }

    delete(id: number): boolean {
        const index = this.users.findIndex(
            (user) => user.id === id,
        );

        if (index === -1) {
            return false;
        }

        this.users.splice(index, 1);

        return true;
    }
}
export const userService = new UserService();
