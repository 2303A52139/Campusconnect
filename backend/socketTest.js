const { io } = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected:", socket.id);

  socket.emit("sendMessage", {
    sender: "Junior",
    text: "Hello Senior!",
  });
});

socket.on("receiveMessage", (data) => {
  console.log("Received:", data);
});