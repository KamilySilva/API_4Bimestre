import { IProdutoRepository } from '../../interfaces/IProdutoRepository';

class EditarProdutoService{
    constructor(
        private ProdutoRepository: IProdutoRepository
    ){}

    public async execute(id: number, nome: string, preco: string, categoria: string, quantidade: string){
        const produto = await this.ProdutoRepository.update(id, nome, preco, categoria, quantidade);
        return produto;
    }
}

export {EditarProdutoService};