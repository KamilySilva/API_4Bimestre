import { IUsuarioRepository } from '../../interfaces/IUsuarioRepository';

class DeletarUsuarioService{
    constructor(
        private UsuarioRepository: IUsuarioRepository
    ){}

    public async execute(id: number){
        const usuario = await this.UsuarioRepository.delete(id);
        return usuario;
    }
}

export {DeletarUsuarioService};