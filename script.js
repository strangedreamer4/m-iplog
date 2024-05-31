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
const db = firebase.firestore();

// Function to fetch and display IP logs
function fetchAndDisplayLogs() {
    const ipList = document.getElementById('ipList');
    ipList.innerHTML = '';

    db.collection("ip_logs").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const ip_address = doc.data().ip_address;
            const li = document.createElement('li');
            li.textContent = ip_address;
            ipList.appendChild(li);
        });
    });
}

// Function to clear IP logs
function clearLogs() {
    db.collection("ip_logs").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            db.collection("ip_logs").doc(doc.id).delete();
        });
    });
    fetchAndDisplayLogs();
}

// Function to download IP logs
function downloadLogs() {
    // Implement download logic here
    // For simplicity, you can display logs in a new window/tab and prompt user to save it.
}

// Fetch and display IP logs on page load
window.onload = function() {
    fetchAndDisplayLogs();
}

// Event listeners for buttons
document.getElementById('clearBtn').addEventListener('click', clearLogs);
document.getElementById('downloadBtn').addEventListener('click', downloadLogs);
