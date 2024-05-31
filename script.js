// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnEro4k5RdqTljsTgny85dNiiGMChYbkk",
  authDomain: "m-iplog.firebaseapp.com",
  projectId: "m-iplog",
  storageBucket: "m-iplog.appspot.com",
  messagingSenderId: "915213232842",
  appId: "1:915213232842:web:3c7ae45975b3f3e50e2233"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const messagesRef = db.ref('messages');

document.getElementById('clear-button').addEventListener('click', clearChat);
document.getElementById('save-log-button').addEventListener('click', saveLog); // Add event listener

messagesRef.on('child_added', function(snapshot) {
    const message = snapshot.val();
    displayMessage(message.timestamp, message.username, message.message, message.ip);
});

function displayMessage(timestamp, username, message, ip) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    const date = new Date(timestamp);
    const formattedTimestamp = date.toLocaleString();

    messageElement.innerHTML = `
        <div><strong>${formattedTimestamp}</strong> - <em>User ID: ${username}</em> - <em>IP: ${ip}</em></div>
        <div>${message}</div>
    `;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
}

function clearChat() {
    if (confirm("Are you sure you want to clear the chat log?")) {
        messagesRef.remove();
        document.getElementById('chat-messages').innerHTML = '';
    }
}

function saveLog() {
    messagesRef.once('value', function(snapshot) {
        const messages = snapshot.val();
        if (!messages) {
            alert('No messages to save.');
            return;
        }

        const logData = Object.values(messages).map(message => {
            return `${message.timestamp} - User ID: ${message.username} - IP: ${message.ip} - ${message.message}`;
        });

        const logContent = logData.join('\n');
        const blob = new Blob([logContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'chat-log.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    });
}
