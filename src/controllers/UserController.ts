import { Request, Response } from 'express';
import { prisma } from '../database';

export default {

    async listUsers(req: Request, res: Response){
        try {
            const users = await prisma.user.findMany();
            return res.json(users);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    
    async createUser(req: Request, res: Response){
        try{
            const {email, password} = req.body;
            const userExist = await prisma.user.findUnique({where: {email}});

            if(userExist){
                return res.json({
                    error: true,
                    message: 'Erro: Usuário já existe!'
                });
            }

            const user = await prisma.user.create({
                data: {
                    email,
                    password
                }
            });

            return res.json({
                error: false,
                message: 'Sucesso: Usuário cadastrado com sucesso!',
                user
            });

        }catch(error){
            return res.json({message: error.message});
        }
    }
};