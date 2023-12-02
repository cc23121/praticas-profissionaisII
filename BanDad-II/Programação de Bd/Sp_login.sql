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

select * from PRATICAS2.usuario

DECLARE @p_email VARCHAR(255) = 'aldinho2307@gmail.com';
DECLARE @p_senha VARCHAR(255) = 'aldo123';
DECLARE @p_logado BIT;


EXEC Praticas2.VerificarLogin @p_email, @p_senha, @p_logado OUTPUT;

IF @p_logado = 1
BEGIN
    PRINT CAST('logado' AS VARCHAR(50));  -- Ajuste o tipo de dados conforme necessário
END

DECLARE @p_email AS VARCHAR(255) = 'aldinho2307@gmail.com';
DECLARE @p_senha  AS VARCHAR(255) = 'aldo123';
DECLARE @p_logado  AS BIT;

EXEC Praticas2.sp_VerificarLogin @p_email, @p_senha, @p_logado OUTPUT;
    SELECT @p_logado AS '@p_logado'
