import { Request, Response } from 'express';
import { BuscarUsuarioPorEmailService } from '../services/UsuarioServices/BuscarUsuarioPorEmailService';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BuscarUsuarioPorIdService } from '../services/UsuarioServices/BuscarUsuarioPorIdService';

type JwtPayload = {
    id: number
}

export default {

    async login(req: Request, res: Response){
        const {email, password} = req.body;

        const buscarUsuarioPorEmail = new BuscarUsuarioPorEmailService(new UsuarioRepository());
        const usuarioExist = await buscarUsuarioPorEmail.execute(email);

        if(!usuarioExist){
            return res.json({
                error: true,
                message: 'Email ou senha inválidos!'
            });
        }

        const verifyPassword = await bcrypt.compare(password, usuarioExist.password);

        if(!verifyPassword){
            return res.json({
                error: true,
                message: 'Email ou senha inválidos!'
            });
        }

        const token = jwt.sign({id: usuarioExist.id}, process.env.JWT_PASSWORD ?? '', {
            expiresIn: '8h',
        });

        return res.json({
            usuario: usuarioExist,
            token: token
        });
    },

    async getProfile(req: Request, res: Response){
        const { authorization } = req.headers;

        if(!authorization){
            return res.json({
                error: true,
                message: 'Não autorizado!'
            });
        }

        const token = authorization.split(' ')[1];

        const { id } = jwt.verify(token, process.env.JWT_PASSWORD ?? '') as JwtPayload;

        const buscarUsuarioPorId = new BuscarUsuarioPorIdService(new UsuarioRepository());
        const usuarioExist = await buscarUsuarioPorId.execute(id);

        if(!usuarioExist){
            return res.json({
                error: true,
                message: 'Não autorizado!'
            });
        }
        return res.json(usuarioExist);
    }

};