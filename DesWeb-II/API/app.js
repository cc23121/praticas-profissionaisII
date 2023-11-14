const express = require('express');
const app = express();
const port = 3000; // Escolha a porta que desejar

const db = require('./db');

// Rota para servir a página HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Rota para buscar os dados da API
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


app.listen(port, () => {
  console.log(`Servidor REST API rodando na porta ${port}`);
});
