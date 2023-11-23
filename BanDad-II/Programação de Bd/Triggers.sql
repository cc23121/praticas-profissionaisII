
CREATE TRIGGER TrVerificarAno
ON PRATICAS2.filme
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (SELECT 1 FROM inserted WHERE Ano > YEAR(GETDATE()) + 1) --2024, por filmes em pré-estreia
    BEGIN
        THROW 51001, 'Ano não pode ser maior que o ano seguinte.', 1;
    END
END;

CREATE TRIGGER TrVerificarNota
ON PRATICAS2.filme
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (SELECT 1 FROM inserted WHERE nota > 5 or nota < 0)
    BEGIN
        THROW 51000, 'Nota não pode ser negativa ou maior que 5.', 1;
    END
END;


