CREATE PROCEDURE PRATICAS2.sp_VerificarLogin
	@p_email VARCHAR(255),
	@p_senha VARCHAR(255),
	@p_logado BIT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	SET @p_logado = 0;

	DECLARE @v_count INT;

	SELECT @v_count = COUNT(*)
	FROM praticas2.usuario
	WHERE email = @p_email AND senha = @p_senha;

	IF @v_count > 0
		SET @p_logado = 1;  -- TRUE
	ELSE
		SET @p_logado = 0;  -- FALSE
END;

DECLARE @p_email AS VARCHAR(255) = 'aldinho2307@gmail.com';
DECLARE @p_senha  AS VARCHAR(255) = 'aldo123';
DECLARE @p_logado  AS BIT;

EXEC Praticas2.sp_VerificarLogin @p_email, @p_senha, @p_logado OUTPUT;
    SELECT @p_logado AS '@p_logado'


------------------------------------------------------------------------------------------------------


CREATE PROCEDURE PRATICAS2.sp_VerificarNome
    @p_email VARCHAR(40),
    @p_senha VARCHAR(9),
    @resultado VARCHAR(30) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @usuarioID INT;
    DECLARE @nome VARCHAR(30);

    -- Verificar as credenciais
    SELECT @usuarioID = usuarioID, @nome = nome
    FROM PRATICAS2.usuario
    WHERE email = @p_email AND senha = @p_senha;

    -- Verificar se as credenciais são válidas
    IF (@usuarioID IS NOT NULL)
    BEGIN
        -- Credenciais corretas, atribuir o nome à variável de resultado
        SET @resultado = @nome;
    END
    ELSE
    BEGIN
        -- Credenciais incorretas, atribuir uma mensagem de erro à variável de resultado
        SET @resultado = 'Credenciais inválidas';
    END
END;


DECLARE @p_email AS VARCHAR(255) = 'aldo123.com';
DECLARE @p_senha  AS VARCHAR(255) = 'aldo123';
DECLARE  @resultado  AS VARCHAR(255);


EXEC Praticas2.sp_VerificarNome @p_email, @p_senha, @resultado OUTPUT;
SELECT @resultado AS 'nome'


select * from PRATICAS2.usuario
