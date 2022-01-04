const api = axios.create({
    // baseURL: "https://recados-api-thobiassilva.herokuapp.com"
    baseURL: "http://localhost:8082"
});

async function signUp() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (!username || !password || !confirmPassword) {
        alert('Informe seus dados');
        return;
    }

    if (password != confirmPassword) {
        alert('As senhas não são iguais!');
        return;
    }
    try {
        result = await api.post('/register', { login: username, password: password });

    } catch (error) {
        alert(error.response.data.message);
    }

    localStorage.setItem('userLoggedToken', JSON.stringify(result.data.data));

    location.href = '../home/';
}


