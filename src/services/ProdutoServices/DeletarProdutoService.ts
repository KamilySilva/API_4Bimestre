import { IProdutoRepository } from '../../interfaces/IProdutoRepository';

class DeletarProdutoService{
    constructor(
        private ProdutoRepository: IProdutoRepository
    ){}

    public async execute(id: number){
        const produto = await this.ProdutoRepository.delete(id);
        return produto;
    }
}

export {DeletarProdutoService};