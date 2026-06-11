import { useEffect, useState } from "react";
import {
  getMessages,
  sendMessage,
} from "../services/chatServices";
import socket from "../sockets/socket";
function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const conversationId =
    "6a1d9dc506d6786110979560";
  const loadMessages = async () => {
    try {
      const data = await getMessages(
        conversationId
      );
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadMessages();
    socket.emit(
      "joinConversation",
      conversationId
    );
  }, []);
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [
        ...prev,
        message,
      ]);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, []);
  const handleSend = async () => {
    if (!text.trim()) return;
    try {
      const newMessage = await sendMessage({
        conversationId,
        senderId: "Junior",
        text,
      });
      socket.emit("sendMessage", newMessage);

      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-container">
      <h1>CampusConnect Chat</h1>

      <div className="card">
        {messages.map((msg) => (
          <p key={msg._id}>
            {msg.text}
          </p>
        ))}
      </div>

      <input
        type="text"
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        placeholder="Type message..."
      />

      <button onClick={handleSend}>
        Send
      </button>
    </div>
  );
}

export default ChatPage;