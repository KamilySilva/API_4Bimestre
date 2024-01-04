import { IProdutoRepository } from '../../interfaces/IProdutoRepository';

class CadastrarProdutoService{
    constructor(
        private ProdutoRepository: IProdutoRepository
    ){}

    public async execute(nome: string, preco: string, categoria: string){
        const produto = await this.ProdutoRepository.create(nome, preco, categoria);
        return produto;
    }
}

export {CadastrarProdutoService};