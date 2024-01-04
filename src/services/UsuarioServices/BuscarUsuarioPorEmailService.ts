import { IUsuarioRepository } from '../../interfaces/IUsuarioRepository';


class BuscarUsuarioPorEmailService{
    constructor(
        private UsuarioRepository: IUsuarioRepository
    ){}

    public async execute(email: string){
        const usuario = await this.UsuarioRepository.findUniqueEmail(email);
        return usuario;
    }
}

export {BuscarUsuarioPorEmailService};