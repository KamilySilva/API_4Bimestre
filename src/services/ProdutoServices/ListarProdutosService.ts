import { IProdutoRepository } from '../../interfaces/IProdutoRepository';

class ListarProdutosService{
    constructor(
        private ProdutoRepository: IProdutoRepository
    ){}

    public async execute(){
        const produtos = await this.ProdutoRepository.findAll();
        return produtos;
    }
}

export {ListarProdutosService};