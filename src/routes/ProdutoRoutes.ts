import Express from 'express';
import ProdutoController from '../controllers/ProdutoController';

const router = Express.Router();

router.get('/listarProdutos', ProdutoController.listarProdutos);
router.post('/cadastrarProduto', ProdutoController.cadastrarProduto);
router.get('/buscarProdutoPorId/:id', ProdutoController.buscarProdutoPorId);
router.get('/buscarProdutoPorNome/:nome', ProdutoController.buscarProdutoPorNome);
router.put('/editarProduto/:id', ProdutoController.editarProduto);
router.delete('/deletarProduto/:id', ProdutoController.deletarProduto);

export default router;
