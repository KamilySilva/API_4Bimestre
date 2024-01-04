import { IUsuarioRepository } from '../../interfaces/IUsuarioRepository';


class BuscarUsuarioPorIdService{
    constructor(
        private UsuarioRepository: IUsuarioRepository
    ){}

    public async execute(id: number){
        const usuario = await this.UsuarioRepository.findUniqueId(id);
        return usuario;
    }
}

export {BuscarUsuarioPorIdService};