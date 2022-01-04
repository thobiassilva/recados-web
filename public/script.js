// Verifica se o usuario esta logado
if (JSON.parse(localStorage.getItem('userLoggedToken'))) {
    location.href = '../home/';
} else {
    location.href = "./login/";
}

