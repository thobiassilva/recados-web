axios.defaults.baseURL = 'https://recados-api-thobiassilva.herokuapp.com';
// http://localhost:8082
// https://recados-api-thobiassilva.herokuapp.com

async function signIn() {
    let result;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Informe seus dados');
        return;
    }
    try {
        result = await axios.post('/login', { login: username, password: password });

    } catch (error) {
        alert(error.response.data.message);
    }

    localStorage.setItem('userLoggedToken', JSON.stringify(result.data.data));

    location.href = '../home/';
}



