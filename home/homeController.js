class StorageAdapter {
    static setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    static getItem(key) {
        return JSON.parse(localStorage.getItem(key));
    }
    static removeItem(key) {
        localStorage.removeItem(key);
    }
}


let myRemoveModal = new bootstrap.Modal(document.getElementById('removeModal'));
let myUpdateModal = new bootstrap.Modal(document.getElementById('updateModal'));

let messagesTable = document.getElementById('messagesTable').getElementsByTagName('tbody')[0];
const username = sessionStorage.getItem('user');
let users = StorageAdapter.getItem('users');
let user;
let userUid;

//Gera as linhas da tabela
function generateRows(index, description, detail, buttons) {
    let row = messagesTable.insertRow(messagesTable.rows.length);
    row.insertCell().innerHTML = index + 1;
    row.insertCell().innerHTML = description;
    row.insertCell().innerHTML = detail;
    row.insertCell().innerHTML = buttons;

}


function load() {

    //Remover todas as linhas da tabela;
    while (messagesTable.firstChild) {
        messagesTable.removeChild(messagesTable.firstChild);
    }

    //Busca o usuario correspondente 
    for (let i = 0; i < users.length; i++) {
        if (username == users[i].username) {
            user = users[i];
            userUid = i;
            break;
        }
    }

    //Carrega os dados do usuario
    for (let x = 0; x < user.messages.length; x++) {
        let buttons = `<button onClick="showRemoveModal(${x})" type="button" class="btn btn-danger text-light me-2">Apagar</button><button onClick="showUpdateModal(${x})" type="button" class="btn btn-success text-light">Editar</button>`;
        generateRows(x, user.messages[x].description, user.messages[x].detail, buttons);
    }
}

// Mostra o modal para Atualizar
function showUpdateModal(id) {
    document.getElementById('descriptionEdit').value = user.messages[id].description;
    document.getElementById('detailEdit').value = user.messages[id].detail;
    document.getElementById('confirmSave').onclick = function () { update(id) };
    myUpdateModal.show();
}

// Mostra o Modal para Remover
function showRemoveModal(id) {
    myRemoveModal.show();
    document.getElementById('confirmRemove').onclick = function () { remove(id) };
}

// Objeto Mensagem
function Message(_description, _detail) {
    this.description = _description;
    this.detail = _detail;
}

// Função para Adicionar
function insert() {
    let description = document.getElementById('description').value;
    let detail = document.getElementById('detail').value;

    if (!description || !detail) return alert('Informe uma descrição e um detalhe');

    user.messages.push(new Message(description, detail));

    users[userUid] = user;

    StorageAdapter.setItem('users', users);

    let index = messagesTable.rows.length
    let buttons = `<button onClick="showRemoveModal(${index})" type="button" class="btn btn-danger text-light me-2">Apagar</button><button onClick="showUpdateModal(${index})" type="button" class="btn btn-success text-light">Editar</button>`;
    generateRows(index, description, detail, buttons);

}

// Função de Atualizar
function update(id) {
    let description = document.getElementById('descriptionEdit').value;
    let detail = document.getElementById('detailEdit').value;

    if (!description || !detail) return alert('Informe uma descrição e um detalhe');

    user.messages[id].description = description;
    user.messages[id].detail = detail;
    users[userUid].messages = user.messages;    //  Atualiza o array com o arrays de mensagem atualizado
    StorageAdapter.removeItem('users');         //  Remove todos os dados
    StorageAdapter.setItem('users', users);     //  Adiciona todos os dados atualizados
    load();                                     //  Da um refresh na pagina
    myUpdateModal.hide();
}

// Função para Remover
function remove(id) {
    user.messages.splice(id, 1);                //  Remove a mensagem indicada
    users[userUid].messages = user.messages;    //  Atualiza o array com o arrays de mensagem atualizado
    StorageAdapter.removeItem('users');         //  Remove todos os dados
    StorageAdapter.setItem('users', users);     //  Adiciona todos os dados atualizados
    load();                                     //  Da um refresh na pagina
    myRemoveModal.hide();
}



