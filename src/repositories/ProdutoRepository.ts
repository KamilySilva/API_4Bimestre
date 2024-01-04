import { prisma } from '../database';
import { IProdutoRepository } from '../interfaces/IProdutoRepository';
import { Produtos } from '@prisma/client';

class ProdutoRepository implements IProdutoRepository{
    public async findAll(): Promise<Produtos[]> {
        const produtos = await prisma.produtos.findMany();
        return produtos;
    }

    public async findMany(nome: string): Promise<Produtos[]> {
        const produtos = await prisma.produtos.findMany({
            where: {
                nome: {
                    contains: nome,
                    mode: 'insensitive',
                }
            }
        });
        return produtos;
    }

    public async findUnique(numericId: number): Promise<Produtos> {
        const produto = await prisma.produtos.findUnique({
            where: {
                id: numericId
            }
        });
        return produto;
    }

    public async create(nome: string, preco: string, categoria: string): Promise<Produtos> {
        const produto = await prisma.produtos.create({
            data: {
                nome,
                preco,
                categoria
            }
        });
        return produto;
    }

    public async update(numericId: number, nome: string, preco: string, categoria: string): Promise<Produtos> {
        const produto = await prisma.produtos.update({
            where: {
                id: numericId
            },
            data: {
                nome,
                preco,
                categoria
            }
        });
        return produto;
    }

    public async delete(numericId: number): Promise<Produtos> {
        const produto = await prisma.produtos.delete({
            where: {
                id: numericId
            }
        });
        return produto;
    }
}

export {ProdutoRepository};