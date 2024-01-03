import Express from 'express';
import UserController from './controllers/UserController';
import ProdutoController from './controllers/ProdutoController';

const app = Express();
app.use(Express.json());
const PORT = 3000;

app.get('/', (req,res) => {
    return res.send({message: 'Hello Word'});
});

app.get('/listUsers', UserController.listUsers);
app.post('/createUser', UserController.createUser);

app.get('/listarProdutos', ProdutoController.listarProdutos);
app.post('/cadastrarProduto', ProdutoController.cadastarProduto);
app.get('/buscarProduto/:id', ProdutoController.buscarProduto);
app.put('/editarProduto/:id', ProdutoController.editarProduto);
app.delete('/deletarProduto/:id', ProdutoController.deletarProduto);

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});