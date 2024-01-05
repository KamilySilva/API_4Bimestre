import { prisma } from '../database';
import { IUsuarioRepository } from '../interfaces/IUsuarioRepository';
import { User } from '@prisma/client';

class UsuarioRepository implements IUsuarioRepository {
    public async findAll(): Promise<User[]> {
        const usuarios = await prisma.user.findMany();
        return usuarios;
    }

    public async findUniqueId(numericId: number): Promise<User> {
        const usuario = await prisma.user.findUnique({
            where: {
                id: numericId
            }
        });
        return usuario;
    }

    public async findUniqueEmail(email: string): Promise<User> {
        const usuario = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        return usuario;
    }

    public async create(email: string, hashPassword: string): Promise<User> {
        const usuario = await prisma.user.create({
            data: {
                email,
                password: hashPassword
            }
        });
        return usuario;
    }

    public async delete(numericId: number): Promise<User> {
        const usuario = await prisma.user.delete({
            where: {
                id: numericId
            }
        });
        return usuario;
    }
}

export {UsuarioRepository};