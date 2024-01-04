import Express from 'express';
import UsuarioController from '../controllers/UsuarioController';

const router = Express.Router();

router.get('/listarUsuarios', UsuarioController.listarUsuarios);
router.post('/cadastrarUsuario', UsuarioController.cadastrarUsuario);
router.get('/buscarUsuarioPorId/:id', UsuarioController.buscarUsuarioPorId);
router.put('/editarUsuario/:id', UsuarioController.editarUsuario);
router.delete('/deletarUsuario/:id', UsuarioController.deletarUsuario);

export default router;
