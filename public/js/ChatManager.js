var Phaser = Phaser || {};
var Platformer = Platformer || {};
var Connection = Connection || {};

var chatBox, form, messageInput;

function drawChatBox(containerId) {
	var container = document.getElementById(containerId);
	
	chatBox = document.createElement('div');
	chatBox.id = 'chat-box';
	
	messageHistory = document.createElement('div');
	messageHistory.id = 'message-history'
	
	form = document.createElement('form');
	form.id = 'chat-form';
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

