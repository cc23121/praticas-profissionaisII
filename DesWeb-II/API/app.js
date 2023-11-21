const express = require('express');
const app = express();

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

const x = app.get('/paginacadastro', (req, res) => {
  res.sendFile(__dirname + '/cadastro.html');
});

//Rota para Cadastro
  app.post('/cadastro', (req, res) => {
    // Extrai os valores do corpo da requisição
    const { nome, email, senha } = req.body;
  
    // Executa a consulta SQL usando os parâmetros
    db.query(
      'INSERT INTO PRATICAS2.usuario (nome, email, senha) VALUES (@valor1, @valor2, @valor3)',
      {
        valor1: nome,
        valor2: email,
        valor3: senha,
      },
      (err, result) => {
        if (err) {
          console.error('Erro na consulta SQL:', err);
          res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
          res.json(result.recordset);
        }
      }
    );
  });
  

const port = 3000; // Escolha a porta que desejar

app.listen(port, () => {
  console.log(`Servidor REST API rodando na porta ${port}`);
});
