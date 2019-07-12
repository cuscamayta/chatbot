'use strict';
$(document).ready(() => {

	const socket = io();
	$('#comment').keypress((e) => {
		const key = e.which || e.keyCode;
		if (key === 13) {
			sendMessageSender()
		}
	})

	$('#chat-send').click(() => {
		sendMessageSender();
	})


	socket.on('ai response', function (response) {
		sendMessageReceiver(response);
	});

	function sendMessageSender() {
		let message = $('#comment').val();
		if (message != '') {
			$('#conversation').append(createMessage(message));

			socket.emit('chat request', message);
			$('#comment').val('');
			console.log(message);
		}
	}

	function sendMessageReceiver(message) {
		speak(message);
		$('#conversation').append(createMessage(message, false));
	}

	function speak(text) {
		var utterance = new SpeechSynthesisUtterance(text);
		speechSynthesis.speak(utterance);
	}

	function createMessage(messageText, isSender = true) {
		const classMessage = isSender ? 'sender' : 'receiver';
		const date = new Date();
		return `
			<div class="row message-body">
				<div class="col-sm-12 message-main-${classMessage}">
					<div class="${classMessage}">
					<div class="message-text">
						${messageText}
					</div>
						<span class="message-time pull-${isSender ? 'left' : 'right'}">
							${date.getHours()}: ${date.getMinutes()} 
						</span>
					</div>
				</div>
			</div>"
		`;
	}


})