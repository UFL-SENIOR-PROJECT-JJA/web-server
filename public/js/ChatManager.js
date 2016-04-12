var Phaser = Phaser || {};
var Platformer = Platformer || {};
var Connection = Connection || {};

var chatBox, form, messageInput;

function hideChatBox(){
	document.getElementById('chat').style.visibility = 'hidden';
}

function drawChatBox(containerId) {

	if(document.getElementById('chat-box') !== null){
		document.getElementById('chat').style.visibility = 'visible';
	}else{
		var container = document.getElementById(containerId);
		var game = document.getElementById('game');
		var canvas = game.querySelector("canvas");
		window.onresize = resize;

		chatBox = document.createElement('div');
		chatBox.id = 'chat-box';
		chatBox.style.width = canvas.style.width;
		if((window.innerWidth - canvas.style.width.replace(/[^-\d\.]/g, ''))/2 > 0){
			chatBox.style.marginLeft = (window.innerWidth - canvas.style.width.replace(/[^-\d\.]/g, ''))/2 - 8 + 'px';
		}


		messageHistory = document.createElement('div');
		messageHistory.id = 'message-history'

		form = document.createElement('form');
		form.id = 'chat-form';
		//form.style.width = canvas.style.width;
		form.action = 'javascript:void(0)';
		form.onsubmit = onSendMessage;

		messageInput = document.createElement('input');
		messageInput.type = 'text';
		messageInput.id = 'chat-input';
		messageInput.placeholder = 'Enter message';

		form.appendChild(messageInput);
		chatBox.appendChild(messageHistory);
		chatBox.appendChild(form);

		container.appendChild(chatBox);

		drawMessage("System", 'Welcome!');
	}
}

function resize(){
	//alert('resize');
	var game = document.getElementById('game');
	var canvas = game.querySelector("canvas");
	var chatbox = document.getElementById('#chat-box');
	console.log("canvas widht: " + canvas.style.width);
	chatBox.style.width = canvas.style.width;
	if((window.innerWidth - canvas.style.width.replace(/[^-\d\.]/g, ''))/2 > 0){
		console.log("shit: "+ (window.innerWidth - canvas.style.width.replace(/[^-\d\.]/g, ''))/2 - 8 + 'px');
		chatBox.style.marginLeft = (window.innerWidth - canvas.style.width.replace(/[^-\d\.]/g, ''))/2 - 8 + 'px';
	}
	setTimeout(resize, 200);
}

function removeChatElements(containerId) {
	if (containerId !== '') {
		var chat = document.getElementById(containerId);
		chat.parentNode.removeChild(chat);
	}
}

function onSendMessage() {
	var message = messageInput.value;

	if (messageInput.value !== '') {
		sendChat(Connection['socket'].name, message);
		drawMessage(Connection['socket'].name, message);
		messageInput.value = '';
	}

	return false;

}

function drawMessage(user, message) {
	var html = '<span class="message">' + user + ' : ' + message + '</span>';
	messageHistory.innerHTML += html + '<br />';
	messageHistory.scrollTop = messageHistory.scrollHeight;
}

function sendChat(username, message) {
	console.log(username + " " + message);
	Connection.Socket.prototype.onChat(username, message);
}

function isInputFocus() {

	if (messageInput === document.activeElement) {
		return true;
	}

	return false;

}
