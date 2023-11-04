import User from "../../core/user/model/User";
import UserRepository from "../../core/user/service/UserRepository";

export default class UserRepositoryInMemory implements UserRepository {
    private readonly users: User[] = [];

    async create(user: User): Promise<User> {
        const newUser = { ...user, id: Math.random() };
        this.users.push(newUser);
        return newUser;
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findById(id: number): Promise<User | null> {
        return this.users.find(user => user.id === id) ?? null;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(user => user.email === email) ?? null;
    }
}