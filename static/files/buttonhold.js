var last_ev

function send_data(message) {
        fetch('/send-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: message })
        })
          .then(response => response.json())
          .then(data => {
            if (data.success === false) {
              showError(data.message);
            } else {
              console.log(data);
            }
          })
          .catch(error => console.error(error));
      }

document.addEventListener('DOMContentLoaded', function() {
	
	const buttons = document.querySelectorAll('button.wd_button');
	
	buttons.forEach(button => {
		if(button.id.startsWith('button_') && button.parentElement.querySelector('input.message').value.startsWith('/release')){
			console.log('add', button)
			button.addEventListener('mousedown', holdButton);
			//button.addEventListener('mouseup', releaseButton);
			button.addEventListener('touchend', releaseButton);
			button.addEventListener('touchstart', holdButton);
		}
		
	});
});

function holdButton(event){
	
	event.preventDefault();
	
	message = event.srcElement.parentElement.parentElement.querySelector('input.message').value;
	message = message.replace("/release", "/hold");
	
	send_data(message)
	
}

function releaseButton(event){
	message = event.srcElement.parentElement.parentElement.querySelector('input.message').value;
	send_data(message)
}