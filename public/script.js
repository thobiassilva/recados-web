// Verifica se o usuario esta logado
if (JSON.parse(localStorage.getItem('userLoggedToken'))) {
    location.href = '../home/home.html';
} else {
    location.href = "./login/login.html";
}

