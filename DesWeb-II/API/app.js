const db = require('./db');

const express = require('express')
const app = express()

const route = require('./routes/route')

//json para objeto 
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/',route)


const port = 3000; 

app.listen(port, () => {
  console.log(`Servidor REST API rodando na porta ${port}`);
});