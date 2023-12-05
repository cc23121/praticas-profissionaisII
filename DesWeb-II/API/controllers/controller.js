const db = require('../db');
const path = require('path');
const sql = require('mssql');


exports.getIndex = ('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});


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

exports.postLog = ('/login', async(req, res) => {
  const { email, senha } = req.body;

  const request = db.request();
  request.input('p_email', sql.VarChar(255), email);
  request.input('p_senha', sql.VarChar(255), senha);
  request.output('p_logado', sql.Bit);

  try {
    const result = await request.execute('Praticas2.sp_VerificarLogin');

    const logado = result.output.p_logado;
    console.log(logado);

    if (logado) {
      console.log("Usuário logado com sucesso!");
      res.redirect('/');

    } else {
      console.log("Credenciais inválidas. Usuário não logado.");
      res.status(401).send("Credenciais inválidas");
    }
  } catch (error) {
    console.error("Erro ao executar a stored procedure:", error);
    res.status(500).send("Erro interno do servidor");
  }
});




exports.postCad = ('/cadastro', (req, res) => {
  console.log("entrou func cad")
  const { name, email, senha } = req.body;
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
        console.log("Cadastro realizado com sucesso!");
        res.redirect('/login');
      }
    }
  );
});


