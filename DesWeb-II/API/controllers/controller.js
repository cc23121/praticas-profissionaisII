exports.getFilmes = async (req, res) => {
    const filmes = await prisma.$queryRaw`SELECT * FROM PRATICAS2.filme`;
    for (let i = 0; i < filmes.length; i++) {
        console.log(filmes[i].Titulo); 
    }
    res.json(filmes);
}

exports.postUsuario = ('/postusuario', async (req, res) => { //login
    const { nome, email, senha } = req.body; // Supondo que os dados do usuário estejam no corpo da requisição

    try {
        const usuario = await prisma.PRATICAS2.Usuario.create({
            data: {
                nome,
                email,
                senha,
            }
        });
        res.json(usuario);

    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar o usuário' });
    }
})


exports.putUsuarios = ('/putusuarios',async(req,res)=>{ //cadastro
    let id = Number(req.query.id)
    const put = await prisma.PrismaCategory.update({
    where: {
        idCategory:id
    },
        data: {
        name:nome
    }
    })
    res.json(put)
})

