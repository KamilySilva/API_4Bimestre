import { IProdutoRepository } from '../../interfaces/IProdutoRepository';

class BuscarProdutoPorNomeService{
    constructor(
        private ProdutoRepository: IProdutoRepository
    ){}

    public async execute(nome: string){
        const produtos = await this.ProdutoRepository.findMany(nome);
        return produtos;
    }
}

export {BuscarProdutoPorNomeService};