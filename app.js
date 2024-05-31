const firebaseConfig = {
    apiKey: "AIzaSyCnEro4k5RdqTljsTgny85dNiiGMChYbkk",
    authDomain: "m-iplog.firebaseapp.com",
    projectId: "m-iplog",
    storageBucket: "m-iplog.appspot.com",
    messagingSenderId: "915213232842",
    appId: "1:915213232842:web:3c7ae45975b3f3e50e2233",
    databaseURL: "https://m-iplog-default-rtdb.asia-southeast1.firebasedatabase.app"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const db = firebase.database();
const ipRef = db.ref('ipAddresses');

// Function to fetch and display IP addresses
function fetchAndDisplayIPs() {
    ipRef.once('value')
        .then((snapshot) => {
            const ipList = document.getElementById('ip-list');
            ipList.innerHTML = ''; // Clear the list before adding new IPs
            console.log("Snapshot data: ", snapshot.val()); // Log the snapshot data for debugging
            snapshot.forEach((childSnapshot) => {
                const ip = childSnapshot.val();
                const ipItem = document.createElement('div');
                ipItem.classList.add('ip-item');
                ipItem.textContent = ip;
                ipList.appendChild(ipItem);
            });
        })
        .catch((error) => {
            console.error("Error fetching IP addresses:", error);
        });
}

// Fetch and display IP addresses when the page loads
window.addEventListener('load', fetchAndDisplayIPs);

// Refresh IP addresses when refresh button is clicked
document.getElementById('refresh-button').addEventListener('click', fetchAndDisplayIPs);
