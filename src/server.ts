import Express from 'express';
import cors from 'cors';
import UsuarioRoutes from './routes/UsuarioRoutes';
import ProdutoRoutes from './routes/ProdutoRoutes';
import LoginRoutes from './routes/LoginRoutes';

const app = Express();

app.use(Express.json());
app.use(cors());
app.use(UsuarioRoutes);
app.use(ProdutoRoutes);
app.use(LoginRoutes);

const PORT = 3000;

app.get('/', (req, res) => {
    return res.send({ message: 'Hello World' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
