import Express from 'express';
import cors from 'cors';
import UsuarioRoutes from './routes/UsuarioRoutes';
import ProdutoRoutes from './routes/ProdutoRoutes';

const app = Express();

app.use(Express.json());
app.use(cors());
app.use(UsuarioRoutes);
app.use(ProdutoRoutes);

const PORT = 3000;

app.get('/', (req, res) => {
    return res.send({ message: 'Hello World' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


/* import Express from 'express';
import cors from 'cors';
import UsuarioController from './controllers/UsuarioController';
import ProdutoController from './controllers/ProdutoController';

const app = Express();
app.use(Express.json());
app.use(cors());
const PORT = 3000;

app.get('/', (req,res) => {
    return res.send({message: 'Hello Word'});
});

app.get('/listarUsuarios', UsuarioController.listarUsuarios);
app.post('/cadastrarUsuario', UsuarioController.cadastrarUsuario);
app.get('/buscarUsuarioPorId/:id', UsuarioController.buscarUsuarioPorId);
app.put('/editarUsuario/:id', UsuarioController.editarUsuario);
app.delete('/deletarUsuario/:id', UsuarioController.deletarUsuario);

app.get('/listarProdutos', ProdutoController.listarProdutos);
app.post('/cadastrarProduto', ProdutoController.cadastarProduto);
app.get('/buscarProdutoPorId/:id', ProdutoController.buscarProdutoPorId);
app.get('/buscarProdutoPorNome/:nome', ProdutoController.buscarProdutoPorNome);
app.put('/editarProduto/:id', ProdutoController.editarProduto);
app.delete('/deletarProduto/:id', ProdutoController.deletarProduto);

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
}); */