// Firebase config - Replace with your Firebase app details
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_APP.firebaseapp.com",
    databaseURL: "https://YOUR_APP.firebaseio.com",
    projectId: "YOUR_APP",
    storageBucket: "YOUR_APP.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  const messagesRef = db.ref("messages");
  
  function sendMessage() {
    const name = document.getElementById("username").value.trim();
    const text = document.getElementById("message").value.trim();
    if (name && text) {
      messagesRef.push({ name, text, timestamp: Date.now() });
      document.getElementById("message").value = "";
    }
  }
  
  messagesRef.on("child_added", (snapshot) => {
    const msg = snapshot.val();
    const messagesDiv = document.getElementById("messages");
    const messageElement = document.createElement("div");
    const time = new Date(msg.timestamp).toLocaleTimeString();
    messageElement.innerHTML = `<strong>[${time}] ${msg.name}:</strong> ${msg.text}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
  
