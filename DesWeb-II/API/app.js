const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const db = require('./db');

// Rota para servir a página HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Rota da API
app.get('/cards', (req, res) => {
  db.query('SELECT * FROM PRATICAS2.filme', (err, result) => {
    if (err) {
      console.error('Erro na consulta SQL:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      res.json(result.recordset);
    }
  });
});

app.get('/paginacadastro', (req, res) => {
  res.sendFile(__dirname + '/cadastro.html');
});

app.get('/paginalogin', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  db.query(`SELECT * FROM praticas2.usuario WHERE email = ${email} AND senha = ${senha}}'`,
  
  (err, results) => {
    console.log("deu");
    if (err) {
      res.status(500).send('Erro ao realizar o login');
    } else {
      if (results.length > 0) {
        res.status(200).send('Login bem-sucedido');
      } else {
        res.status(401).send('Credenciais inválidas');
      }
    }
  });
  console.log("deu2")
});

//Rota para Cadastro
app.post('/cadastro', (req, res) => {
  const {name, email, senha} = req.body;
  console.log(name);

  console.log(req.body)

  // Executa a consulta SQL usando os parâmetros
  db.query(
    `INSERT INTO praticas2.usuario (nome, email, senha) VALUES ('${name}', '${email}', '${senha}')`,
    (err, result) => {
      if (err) {
        console.error('Erro na consulta SQL:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        res.json(result.recordset);
      }
    }
  ); 
  console.log("deu")
});


const port = 3000; // Escolha a porta que desejar

app.listen(port, () => {
  console.log(`Servidor REST API rodando na porta ${port}`);
});
