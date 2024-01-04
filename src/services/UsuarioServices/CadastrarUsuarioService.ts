import { IUsuarioRepository } from '../../interfaces/IUsuarioRepository';

class CadastrarUsuarioService{
    constructor(
        private UsuarioRepository: IUsuarioRepository
    ){}

    public async execute(email: string, password: string){
        const usuario = await this.UsuarioRepository.create(email, password);
        return usuario;
    }
}

export {CadastrarUsuarioService};