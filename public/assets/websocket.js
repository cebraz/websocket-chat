socket = new WebSocket("ws://localhost:8080");

socket.onopen = function(e){
    console.log("conexão bem sucedida!");
};

socket.onmessage = function(e){
    let dados = JSON.parse(e.data)
    let html = generateHTML(dados);
    let chat = document.getElementById('chat');

    chat.appendChild(html);
};

function enviarMensagem(){
    let mensagem = $('#message');

    if(mensagem.val() !== ''){
        socket.send(mensagem.val());
        mensagem.val('');
    }
    else{
        console.log('mensagem vazia');
    }
}

/**
 * Função que renderiza os dados vindos do websocket no html.
 * 
 * Deve existir outra forma de se renderezar os dados sem precisar criá-los na mão, 
 * mas eu só desejava algo rápido para testar o websocket funcionando no html.
 */
function generateHTML(dados){
    let listItem = document.createElement('li');
    let spanUser = document.createElement('span');
    let imgUser = document.createElement('img');
    let divChatBody = document.createElement('div');
    let divChildBody = document.createElement('div');
    let nameUser = document.createElement('strong');
    let timePost = document.createElement('small');
    let timerIcon = document.createElement('span');
    let messageBox = document.createElement('p');

    spanUser.setAttribute('class', 'chat-img pull-left');
    imgUser.setAttribute('class', 'img-circle');
    divChatBody.setAttribute('class', 'chat-body clearfix');
    divChildBody.setAttribute('class', 'header');
    nameUser.setAttribute('class', 'primary-font');
    timePost.setAttribute('class', 'pull-right text-muted');
    timerIcon.setAttribute('class', 'glyphicon glyphicon-time');

    imgUser.setAttribute('src', 'http://placehold.it/50/55C1E7/fff&text=U');
    divChatBody.setAttribute('id', 'chat-body');

    nameUser.innerText = dados['from'];
    timePost.innerText = dados['date'];
    messageBox.innerHTML = dados['msg'];

    spanUser.appendChild(imgUser);
    timePost.appendChild(timerIcon);
    divChildBody.appendChild(nameUser);
    divChildBody.appendChild(timePost);
    divChatBody.appendChild(divChildBody);
    divChatBody.appendChild(messageBox);
    listItem.appendChild(spanUser);
    listItem.appendChild(divChatBody);

    return listItem;
}