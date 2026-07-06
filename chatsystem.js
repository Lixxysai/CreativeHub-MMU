const socket = io();

const username = localStorage.getItem("username");

if (!username) {
    alert("Please login first.");
    window.location.href = "/login.html";
}

const chatWindow = document.getElementById("chatWindow");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

socket.emit('load global messages');

socket.on('global message history', (messages) => {
    chatWindow.innerHTML = ""; // Clear the chat window before loading messages
    messages.forEach(data => {
        const msgElement = document.createElement("p");

        msgElement.innerHTML = `<strong>${data.senderId}</strong>: ${data.message}`;

        chatWindow.appendChild(msgElement);
    });

    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom after loading messages

}); 

sendBtn.addEventListener("click", () => {


    const message = messageInput.value.trim();

    if (!message) return;

    socket.emit("send global message", {
        senderid: username,
        message: message
    });

    messageInput.value = "";
});

socket.on("receive global message", (data) => {

    const msg = document.createElement("p");

    msg.innerHTML = `<strong>${data.senderid}</strong>: ${data.message}`;

    chatWindow.appendChild(msg);

    chatWindow.scrollTop = chatWindow.scrollHeight;

});
