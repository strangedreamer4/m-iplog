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

const db = firebase.database();
const ipRef = db.ref('ipAddresses');

const ipList = document.getElementById('ip-list');
const refreshButton = document.getElementById('refresh-button');

refreshButton.addEventListener('click', () => {
    fetchIPs();
});

function fetchIPs() {
    ipRef.once('value', (snapshot) => {
        console.log("Snapshot:", snapshot.val()); // Log the snapshot
        ipList.innerHTML = ''; // Clear the list
        snapshot.forEach((childSnapshot) => {
            const ip = childSnapshot.val();
            const ipItem = document.createElement('div');
            ipItem.classList.add('ip-item');
            ipItem.textContent = ip;
            ipList.appendChild(ipItem);
        });
    });
}
