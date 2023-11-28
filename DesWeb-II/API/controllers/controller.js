const db = require('../db');
const path = require('path');


// Rota para servir a página HTML
exports.getIndex = ('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Rota da API
exports.getCards = ('/cards', (req, res) => {
  db.query('SELECT * FROM PRATICAS2.filme', (err, result) => {
    if (err) {
      console.error('Erro na consulta SQL:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      res.json(result.recordset);
    }
  });
});

exports.getPaginaCad = ('/paginacadastro', (req, res) => {
  console.log("entrou pagina cadastro")
  res.sendFile(path.join(__dirname, '../cadastro.html'));
});

exports.getPaginaLog = ('/paginalogin', (req, res) => {
  console.log("entrou pagina log")
  res.sendFile(path.join(__dirname, '../login.html'));
});

exports.postLog = ('/login', (req, res) => {
  const { email, senha } = req.body;
  console.log(req.body);

  db.query(`SELECT * FROM praticas2.usuario WHERE email = '${email}' AND senha = '${senha}'`, //substituir pela SP de
    (err, results) => {
      console.log("deu");

      if (err) {
        
        console.log("Deu erro");
      } else {
        console.log("Deu CERTO");
      }
    }
  )
  res.redirect('/');
});


//Rota para Cadastro
exports.postCad = ('/cadastro', (req, res) => {
  console.log("entrou func cad")
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

