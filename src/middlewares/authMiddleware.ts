import { NextFunction, Request, Response } from 'express';
import { BuscarUsuarioPorIdService } from '../services/UsuarioServices/BuscarUsuarioPorIdService';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id: number
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
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

    //req.usuario = usuarioExist;

    next();
};