import {User} from '@prisma/client';

export interface IUsuarioRepository{
    findAll(): Promise<User[]>;
    findUniqueId(numericId: number): Promise<User>;
    findUniqueEmail(email: string): Promise<User>;
    create(email: string, hashPassword: string): Promise<User>;
    delete(numericId: number): Promise<User>;
}