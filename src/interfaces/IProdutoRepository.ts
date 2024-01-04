import {Produtos} from '@prisma/client';

export interface IProdutoRepository{
    findAll(): Promise<Produtos[]>;
    findMany(nome: string): Promise<Produtos[]>;
    findUnique(numericId: number): Promise<Produtos>;
    create(nome: string, preco: string, categoria: string): Promise<Produtos>;
    update(numericId: number, nome: string, preco: string, categoria: string): Promise<Produtos>;
    delete(numericId: number): Promise<Produtos>;
}