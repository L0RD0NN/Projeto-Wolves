const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./database');
const authRoutes = require('./routes/auth');
const equipamentosRoutes = require('./routes/equipamentos');
const emprestimosRoutes = require('./routes/emprestimos');
const devolucoesRoutes = require('./routes/devolucoes');
const adminRoutes = require('./routes/admin');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/equipamentos', equipamentosRoutes);
app.use('/emprestimos', emprestimosRoutes);
app.use('/devolucoes', devolucoesRoutes);
app.use('/admin', adminRoutes);

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Banco de dados sincronizado com sucesso.');
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    })
    .catch(err => {
        console.error('Erro ao sincronizar o banco de dados:', err);
    });