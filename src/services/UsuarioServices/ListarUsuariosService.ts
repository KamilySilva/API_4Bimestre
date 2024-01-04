import { IUsuarioRepository } from '../../interfaces/IUsuarioRepository';


class ListarUsuariosService{
    constructor(
        private UsuarioRepository: IUsuarioRepository
    ){}

    public async execute(){
        const usuarios = await this.UsuarioRepository.findAll();
        return usuarios;
    }
}

export {ListarUsuariosService};