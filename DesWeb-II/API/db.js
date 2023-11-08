const sql = require('mssql');

const config = {
  user: process.env.SQL_USER || 'BD23121', // Defina seu usuário
  password: process.env.SQL_PASSWORD || 'BD23121', // Defina sua senha
  server: process.env.SQL_SERVER || 'regulus.cotuca.unicamp.br', // Defina seu servidor
  database: process.env.SQL_DATABASE || 'BD23121', // Defina seu banco de dados
  options: {
    encrypt: process.env.SQL_ENCRYPT === 'true',
    trustServerCertificate: process.env.SQL_TRUST_SERVER_CERTIFICATE === 'true',
  },
};

const pool = new sql.ConnectionPool(config);

pool.connect()
  .then(() => {
    console.log('Conexão com o SQL Server estabelecida.');
  })
  .catch(err => {
    console.error('Erro de conexão com o SQL Server:', err);
  });

module.exports = pool;
