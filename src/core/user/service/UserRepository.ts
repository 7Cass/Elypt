import User from "../model/User";

export default interface UserRepository {
    create(user: Partial<User>): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}