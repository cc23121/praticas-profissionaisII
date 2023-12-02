// Função para realizar o login
function login() {
    // Obter valores de entrada
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Verificar se as credenciais estão corretas (simplificado para exemplo)
    if (username === "aldo" && password === "aldo") {
        // Esconder o formulário de login
        document.getElementById("loginForm").style.display = "none";

        // Exibir o conteúdo principal
        document.getElementById("mainContent").style.display = "block";

        // Armazenar informações de login no localStorage
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", username);
    } else {
        alert("Credenciais inválidas. Tente novamente.");
    }
    console.log(localStorage)
}

// Verificar se o usuário está logado ao carregar a página
window.onload = function () {
    var isLoggedIn = localStorage.getItem("loggedIn");

    if (isLoggedIn === "true") {
        // Se estiver logado, esconder o formulário de login e exibir o conteúdo principal
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
    }
};
