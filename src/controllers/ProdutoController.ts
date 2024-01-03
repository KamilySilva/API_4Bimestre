import { Request, Response } from 'express';
import { prisma } from '../database';

export default {

    async listarProdutos(req: Request, res: Response){
        try {
            const produtos = await prisma.produtos.findMany();
            return res.json(produtos);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    
    async cadastarProduto(req: Request, res: Response){
        try{
            const {nome, preco, categoria} = req.body;

            const produto = await prisma.produtos.create({
                data: {
                    nome,
                    preco,
                    categoria
                }
            });

            return res.json({
                error: false,
                message: 'Sucesso: Produto cadastrado com sucesso!',
                produto
            });

        }catch(error){
            return res.json({message: error.message});
        }
    },

    async buscarProduto(req: Request, res: Response){
        try{
            const {id} = req.params;

            const produto = await prisma.produtos.findUnique({ where: {id: Number(id)} });

            if(!produto){
                return res.json({
                    error: true,
                    message: 'Error: Produto não encontrado!',
                });
            }

            return res.json({
                error: false,
                produto
            });

        }catch(error){
            return res.json({message: error.message});
        }
    },

    async editarProduto(req: Request, res: Response){
        try{
            const {id} = req.params;
            const {nome, preco, categoria} = req.body;

            const produtoExist = await prisma.produtos.findUnique({ where: {id: Number(id)} });

            if(!produtoExist){
                return res.json({
                    error: true,
                    message: 'Error: Produto não encontrado!',
                });
            }

            const produto = await prisma.produtos.update({
                where: {
                    id: Number(req.params.id)
                },
                data: {
                    nome,
                    preco,
                    categoria
                }
            });

            return res.json({
                error: false,
                message: 'Sucesso: Produto atualizado com sucesso!',
                produto
            });

        }catch(error){
            return res.json({message: error.message});
        }
    },

    async deletarProduto(req: Request, res: Response){
        try{
            const {id} = req.params;

            const produtoExist = await prisma.produtos.findUnique({ where: {id: Number(id)} });

            if(!produtoExist){
                return res.json({
                    error: true,
                    message: 'Error: Produto não encontrado!',
                });
            }

            const produto = await prisma.produtos.delete({
                where: {
                    id: Number(req.params.id)
                }
            });

            return res.json({
                error: false,
                message: 'Sucesso: Produto deletado com sucesso!',
                produto
            });

        }catch(error){
            return res.json({message: error.message});
        }
    }
};