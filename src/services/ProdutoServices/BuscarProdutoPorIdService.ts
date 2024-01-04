import { IProdutoRepository } from '../../interfaces/IProdutoRepository';

class BuscarProdutoPorIdService{
    constructor(
        private ProdutoRepository: IProdutoRepository
    ){}

    public async execute(id: number){
        const produtos = await this.ProdutoRepository.findUnique(id);
        return produtos;
    }
}

export {BuscarProdutoPorIdService};