axios.defaults.baseURL = 'https://recados-api-thobiassilva.herokuapp.com';
// http://localhost:8082
// https://recados-api-thobiassilva.herokuapp.com

let myRemoveModal = new bootstrap.Modal(document.getElementById('removeModal'));
let myUpdateModal = new bootstrap.Modal(document.getElementById('updateModal'));

let messagesTable = document.getElementById('messagesTable').getElementsByTagName('tbody')[0];
let userUid = JSON.parse(localStorage.getItem('userLoggedToken'));

// Verifica se o usuario esta logado
if (!userUid) {
    location.href = "../login/";
}

axios.defaults.headers.common['Authorization'] = userUid;

let messages = [];




//Gera as linhas da tabela
function generateRows(index, description, detail, buttons) {
    let row = messagesTable.insertRow(messagesTable.rows.length);
    row.insertCell().innerHTML = index + 1;
    row.insertCell().innerHTML = description;
    row.insertCell().innerHTML = detail;
    row.insertCell().innerHTML = buttons;
}

// Mostra o modal para Atualizar
function showUpdateModal(id) {
    document.getElementById('descriptionEdit').value = messages[id].title;
    document.getElementById('detailEdit').value = messages[id].detail;
    document.getElementById('confirmSave').onclick = function () { update(messages[id].uid) };
    myUpdateModal.show();
}

// Mostra o Modal para Remover
function showRemoveModal(id) {
    myRemoveModal.show();
    document.getElementById('confirmRemove').onclick = function () { remove(messages[id].uid) };
}


async function load() {
    // Remover todas as linhas da tabela;
    while (messagesTable.firstChild) {
        messagesTable.removeChild(messagesTable.firstChild);
    }

    try {
        result = await axios.get('/messages');
    } catch (error) {
        alert(error.response.data.message);
    }

    messages = result.data.data;

    for (let x = 0; x < messages.length; x++) {
        let buttons = `<button onClick="showRemoveModal(${x})" type="button" class="btn btn-danger text-light me-2">Apagar</button><button onClick="showUpdateModal(${x})" type="button" class="btn btn-success text-light">Editar</button>`;
        generateRows(x, messages[x].title, messages[x].detail, buttons);
    }
}



function Message(_title, _detail) {
    this.title = _title;
    this.detail = _detail;
}

async function insert() {

    let titleInput = document.getElementById('description');
    let detailInput = document.getElementById('detail');

    let title = titleInput.value;
    let detail = detailInput.value

    if (!title || !detail) return alert('Informe uma descrição e um detalhe');

    try {
        result = await axios.post('/messages', new Message(title, detail));
    } catch (error) {
        alert(error.response.data.message);
    }

    titleInput.value = '';
    detailInput.value = '';
    load();
}

async function update(uid) {
    let title = document.getElementById('descriptionEdit').value;
    let detail = document.getElementById('detailEdit').value;

    if (!title || !detail) return alert('Informe uma descrição e um detalhe');

    try {
        result = await axios.put('/messages/' + uid, new Message(title, detail));

    } catch (error) {
        alert(error.response.data.message);
    }

    load();
    myUpdateModal.hide();
}

async function remove(uid) {
    try {
        result = await axios.delete('/messages/' + uid);
    } catch (error) {
        alert(error.response.data.message);
    }

    load();
    myRemoveModal.hide();
}

function logout() {
    localStorage.removeItem('userLoggedToken');
    location.href = "../login/";
}