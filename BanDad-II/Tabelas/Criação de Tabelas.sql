CREATE SCHEMA PRATICAS2

CREATE TABLE PRATICAS2.usuario (
    usuarioID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    nome VARCHAR(30) NOT NULL,
    email VARCHAR(40) NOT NULL,
    senha VARCHAR(9) NOT NULL
);



CREATE TABLE PRATICAS2.administrador (
    admID INT IDENTITY(1,1) PRIMARY KEY,
	nome VARCHAR(30) NOT NULL,
    senha VARCHAR(7) not null,
);


-- Cria��o da tabela "avaliacao"
CREATE TABLE PRATICAS2.avaliacao (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT,
    filme_id INT,
    nota DECIMAL(3, 2) NOT NULL CHECK (nota >= 0 AND nota <= 5),
    data_avaliacao DATE,
    FOREIGN KEY (usuario_id) REFERENCES PRATICAS2.usuario(usuarioID),
    FOREIGN KEY (filme_id) REFERENCES PRATICAS2.filme(idFilme)
);

-- Cria��o da tabela "critica"
CREATE TABLE critica (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT,
    filme_id INT,
    texto TEXT NOT NULL,
    data_critica DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (filme_id) REFERENCES filme(id)
);


--Cria��o da Trigger que calcula a media de avaliacoes e adiciona a tabela de filmes
CREATE TRIGGER calcular_media_avaliacao
AFTER INSERT ON avaliacao
FOR EACH ROW
BEGIN
    DECLARE avg_avaliacao DECIMAL(3, 2);
    
    -- Calcula a m�dia das avalia��es para o filme
    SELECT AVG(nota) INTO avg_avaliacao
    FROM avaliacao
    WHERE filme_id = NEW.filme_id;
    
    -- Atualiza a m�dia na tabela "filme"
    UPDATE filme
    SET avaliacao_media = avg_avaliacao
    WHERE id = NEW.filme_id;
END;


insert into PRATICAS2.filme 

-- Inserir um filme
INSERT INTO PRATICAS2.filme (Titulo, diretor, Ano, sinopse, nota)
VALUES ('Pulp Fiction', 'Quentin Tarantino', 1994, 'Uma hist�ria n�o linear de crime e reden��o.', 8.9);

-- Inserir outro filme
INSERT INTO PRATICAS2.filme (Titulo, diretor, Ano, sinopse, nota)
VALUES ('Matrix', 'The Wachowskis', 1999, 'Um ciberpunk �pico de a��o e fic��o cient�fica.', 8.7);

-- Inserir mais filmes
INSERT INTO PRATICAS2.filme (Titulo, diretor, Ano, sinopse, nota)
VALUES ('Forrest Gump', 'Robert Zemeckis', 1994, 'A vida de um homem simples e as reviravoltas do destino.', 8.8);

INSERT INTO PRATICAS2.filme (Titulo, diretor, Ano, sinopse, nota)
VALUES ('O Senhor dos An�is: A Sociedade do Anel', 'Peter Jackson', 2001, 'Uma jornada �pica em um mundo de fantasia.', 8.8);

INSERT INTO PRATICAS2.filme (Titulo, diretor, Ano, sinopse, nota)
VALUES ('Cidade de Deus', 'Fernando Meirelles e K�tia Lund', 2002, 'A vida nas favelas do Rio de Janeiro.', 8.6);


INSERT INTO PRATICAS2.filme (Titulo, diretor, Ano, sinopse, nota)
VALUES ('O Poderoso Chef�o', 'Francis Ford Coppola', 1972, 'Uma hist�ria de fam�lia na m�fia italiana.', 9.2);

INSERT INTO PRATICAS2.filme (Titulo, diretor, Ano, sinopse, nota, url_foto)
VALUES ('Interestelar', 'Christopher Nolan', 2014, 'Uma aventura no espa�o em busca de um novo lar para a humanidade.', 8.6, 'https://upload.wikimedia.org/wikipedia/pt/3/3a/Interstellar_Filme.png')

