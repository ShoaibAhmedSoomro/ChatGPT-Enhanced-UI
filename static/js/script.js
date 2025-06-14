document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById("sendButton");
    const questionInput = document.getElementById("question");
    const right1 = document.querySelector(".right1");
    const right2 = document.querySelector(".right2");

    // Handle send button click
    sendButton.addEventListener("click", handleSendMessage);
    
    // Handle enter key press
    questionInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    });

    async function handleSendMessage() {
        const question = questionInput.value.trim();
        
        if (!question) {
            alert("Please enter a question!");
            return;
        }

        // Clear input
        questionInput.value = "";
        
        // Show chat interface
        right1.style.display = "none";
        right2.style.display = "flex";
        
        // Add user message to chat
        addMessageToChat(question, 'user');
        
        try {
            // Send question to backend
            const response = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: question })
            });
            
            const data = await response.json();
            
            // Add bot response to chat
            addMessageToChat(data.result, 'bot');
            
        } catch (error) {
            console.error('Error:', error);
            addMessageToChat('Sorry, there was an error processing your request.', 'bot');
        }
    }

    function addMessageToChat(message, sender) {
        const chatContainer = document.querySelector('.chat-messages');
        
        if (!chatContainer) {
            // Create chat container if it doesn't exist
            const newChatContainer = document.createElement('div');
            newChatContainer.className = 'chat-messages';
            right2.insertBefore(newChatContainer, right2.querySelector('.input'));
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-container py-7 flex justify-start w-[40vw] items-center space-x-6 ${sender === 'bot' ? 'bg-slate-200 w-full justify-center' : ''}`;
        
        const avatarImg = document.createElement('img');
        avatarImg.className = 'w-[8%]';
        avatarImg.src = sender === 'user' ? '/static/user.png' : '/static/bot.png';
        avatarImg.alt = sender;
        
        const messageText = document.createElement('div');
        messageText.textContent = message;
        
        if (sender === 'bot') {
            const innerBox = document.createElement('div');
            innerBox.className = 'box w-[40vw] flex justify-start space-x-6';
            innerBox.appendChild(avatarImg);
            innerBox.appendChild(messageText);
            messageDiv.appendChild(innerBox);
        } else {
            messageDiv.appendChild(avatarImg);
            messageDiv.appendChild(messageText);
        }
        
        const chatMessages = document.querySelector('.chat-messages');
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle example button clicks
    const exampleButtons = document.querySelectorAll('.examples button, .cap button, .lim button');
    exampleButtons.forEach(button => {
        button.addEventListener('click', function() {
            questionInput.value = this.textContent;
            handleSendMessage();
        });
    });
});