import { Request, Response } from 'express';
import { CadastrarProdutoService } from '../services/ProdutoServices/CadastrarProdutoService';
import { ProdutoRepository } from '../repositories/ProdutoRepository';
import { EditarProdutoService } from '../services/ProdutoServices/EditarProdutoService';
import { DeletarProdutoService } from '../services/ProdutoServices/DeletarProdutoService';
import { ListarProdutosService } from '../services/ProdutoServices/ListarProdutosService';
import { BuscarProdutoPorIdService } from '../services/ProdutoServices/BuscarProdutoPorIdService';
import { BuscarProdutoPorNomeService } from '../services/ProdutoServices/BuscarProdutoPorNomeService';

export default {

    async listarProdutos(req: Request, res: Response){
        try {
            const listarProdutos = new ListarProdutosService(new ProdutoRepository());
            const produtos = await listarProdutos.execute();

            return res.json(produtos);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async cadastarProduto(req: Request, res: Response){
        try{
            const {nome, preco, categoria} = req.body;
            const cadastarProduto = new CadastrarProdutoService(new ProdutoRepository());
            const produto = await cadastarProduto.execute(nome, preco, categoria);

            return res.json({
                error: false,
                message: 'Sucesso: Produto cadastrado com sucesso!',
                produto
            });

        }catch(error){
            return res.json({message: error.message});
        }
    },

    async buscarProdutoPorId(req: Request, res: Response){
        try{
            const {id} = req.params;

            const numericId = Number(id);

            const buscarProdutoPorId = new BuscarProdutoPorIdService(new ProdutoRepository());
            const produto = await buscarProdutoPorId.execute(numericId);

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

    async buscarProdutoPorNome(req: Request, res: Response) {
        try {
            const { nome } = req.params;

            const buscarProdutoPorNome = new BuscarProdutoPorNomeService(new ProdutoRepository());
            const produtos = await buscarProdutoPorNome.execute(nome);


            if (!produtos.length) {
                return res.json({
                    error: true,
                    message: 'Error: Nenhum produto encontrado com esse nome.',
                });
            }

            return res.json({
                error: false,
                produtos
            });

        } catch (error) {
            return res.json({ message: error.message });
        }
    },

    async editarProduto(req: Request, res: Response){
        try{
            const {id} = req.params;
            const {nome, preco, categoria} = req.body;

            const numericId = Number(id);

            const buscarProdutoPorId = new BuscarProdutoPorIdService(new ProdutoRepository());
            const produtoExist = await buscarProdutoPorId.execute(numericId);

            if(!produtoExist){
                return res.json({
                    error: true,
                    message: 'Error: Produto não encontrado!',
                });
            }

            const editarProduto = new EditarProdutoService(new ProdutoRepository());
            const produto = await editarProduto.execute(numericId, nome, preco, categoria);

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

            const numericId = Number(id);

            const buscarProdutoPorId = new BuscarProdutoPorIdService(new ProdutoRepository());
            const produtoExist = await buscarProdutoPorId.execute(numericId);

            if(!produtoExist){
                return res.json({
                    error: true,
                    message: 'Error: Produto não encontrado!',
                });
            }

            const deletarProduto = new DeletarProdutoService(new ProdutoRepository());
            const produto = await deletarProduto.execute(numericId);

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