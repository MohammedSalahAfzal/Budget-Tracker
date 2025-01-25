// Function to show the selected tab and hide the others
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
      tab.classList.add('hidden');
    });
    document.getElementById(tabId).classList.remove('hidden');
  }
  
  // Voice Assistant and Chatbot
  const startRecordBtn = document.getElementById('start-record-btn');
  const chatbox = document.getElementById('chatbox');
  const chatInput = document.getElementById('chat-input');
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    addChatMessage('User', transcript);
    processChatMessage(transcript);
  };
  
  startRecordBtn.addEventListener('click', () => {
    recognition.start();
  });
  
  chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const message = chatInput.value;
      addChatMessage('User', message);
      processChatMessage(message);
      chatInput.value = '';
    }
  });
  
  function addChatMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('mb-2');
    messageElement.innerHTML = `${sender}: ${message}`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
  }
  
  function processChatMessage(message) {
    // Simple chatbot logic for demonstration
    let response = 'I did not understand that.';
    if (message.toLowerCase().includes('hello')) {
      response = 'Hello! How can I assist you today?';
    } else if (message.toLowerCase().includes('balance')) {
      response = 'Your current balance is ₹5,240.74.';
    } else if (message.toLowerCase().includes('spent')) {
      response = 'You have spent ₹682.5 this month.';
    }
    addChatMessage('Assistant', response);
    speak(response);
  }
  
  function speak(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
  }
  