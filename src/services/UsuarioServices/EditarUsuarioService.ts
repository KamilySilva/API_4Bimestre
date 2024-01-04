import { IUsuarioRepository } from '../../interfaces/IUsuarioRepository';

class EditarUsuarioService{
    constructor(
        private UsuarioRepository: IUsuarioRepository
    ){}

    public async execute(id: number, email: string, password: string){
        const usuario = await this.UsuarioRepository.update(id, email, password);
        return usuario;
    }
}

export {EditarUsuarioService};