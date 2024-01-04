import { Request, Response } from 'express';
import { BuscarUsuarioPorIdService } from '../services/UsuarioServices/BuscarUsuarioPorIdService';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { ListarUsuariosService } from '../services/UsuarioServices/ListarUsuariosService';
import { DeletarUsuarioService } from '../services/UsuarioServices/DeletarUsuarioService';
import { EditarUsuarioService } from '../services/UsuarioServices/EditarUsuarioService';
import { CadastrarUsuarioService } from '../services/UsuarioServices/CadastrarUsuarioService';
import { BuscarUsuarioPorEmailService } from '../services/UsuarioServices/BuscarUsuarioPorEmailService';

export default {

    async listarUsuarios(req: Request, res: Response){
        try {
            const listarUsuarios = new ListarUsuariosService(new UsuarioRepository());
            const usuarios = await listarUsuarios.execute();

            return res.json(usuarios);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async cadastrarUsuario(req: Request, res: Response){
        try{
            const {email, password} = req.body;

            const buscarUsuarioPorEmail = new BuscarUsuarioPorEmailService(new UsuarioRepository());
            const usuarioExist = await buscarUsuarioPorEmail.execute(email);

            if(usuarioExist){
                return res.json({
                    error: true,
                    message: 'Erro: Usuário já existe!'
                });
            }

            const cadastrarUsuario = new CadastrarUsuarioService(new UsuarioRepository());
            const usuario = await cadastrarUsuario.execute(email, password);

            return res.json({
                error: false,
                message: 'Sucesso: Usuário cadastrado com sucesso!',
                usuario
            });

        }catch(error){
            return res.json({message: error.message});
        }
    },

    async buscarUsuarioPorId(req: Request, res: Response){
        try{
            const {id} = req.params;

            const numericId = Number(id);

            const buscarUsuarioPorId = new BuscarUsuarioPorIdService(new UsuarioRepository());
            const usuario = await buscarUsuarioPorId.execute(numericId);

            if(!usuario){
                return res.json({
                    error: true,
                    message: 'Error: Usuário não encontrado!',
                });
            }

            return res.json({
                error: false,
                usuario
            });

        }catch(error){
            return res.json({message: error.message});
        }
    },

    async editarUsuario(req: Request, res: Response){
        try{
            const {id} = req.params;
            const {email, password} = req.body;

            const numericId = Number(id);

            const buscarUsuarioPorId = new BuscarUsuarioPorIdService(new UsuarioRepository());
            const usuarioExist = await buscarUsuarioPorId.execute(numericId);

            if(!usuarioExist){
                return res.json({
                    error: true,
                    message: 'Error: Usuário não encontrado!',
                });
            }

            const editarUsuario = new EditarUsuarioService(new UsuarioRepository());
            const usuario = await editarUsuario.execute(numericId, email, password);

            return res.json({
                error: false,
                message: 'Sucesso: Usuário atualizado com sucesso!',
                usuario
            });

        }catch(error){
            return res.json({message: error.message});
        }
    },

    async deletarUsuario(req: Request, res: Response){
        try{
            const {id} = req.params;

            const numericId = Number(id);

            const buscarUsuarioPorId = new BuscarUsuarioPorIdService(new UsuarioRepository());
            const usuarioExist = await buscarUsuarioPorId.execute(numericId);

            if(!usuarioExist){
                return res.json({
                    error: true,
                    message: 'Error: Usuário não encontrado!',
                });
            }

            const deletarUsuario = new DeletarUsuarioService(new UsuarioRepository());
            const usuario = await deletarUsuario.execute(numericId);

            return res.json({
                error: false,
                message: 'Sucesso: Usuário deletado com sucesso!',
                usuario
            });

        }catch(error){
            return res.json({message: error.message});
        }
    }
};