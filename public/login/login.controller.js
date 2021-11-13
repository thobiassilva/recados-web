const api = axios.create({
    baseURL: "https://recados-api-thobiassilva.herokuapp.com"
});

async function signIn() {
    let result;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Informe seus dados');
        return;
    }
    try {
        result = await api.post('/login', { login: username, password: password });

    } catch (error) {
        alert(error.response.data.message);
    }

    localStorage.setItem('userLoggedToken', JSON.stringify(result.data.data));

    location.href = '../home/home.html';
}



