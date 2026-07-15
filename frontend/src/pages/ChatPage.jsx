import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getMessages, sendMessage } from "../services/chatServices";
import Loader from "../components/Common/Loader";
import socket from "../sockets/socket";

export default function ChatPage() {
  const { conversationId } = useParams();
  const { user, token } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && conversationId) {
      fetchMessages();
      socket.emit("joinConversation", conversationId);

      socket.on("receiveMessage", (incoming) => {
        if (incoming.conversationId !== conversationId) return;
        if (incoming.senderId === user._id) return;
        setMessages((prev) => [...prev, incoming]);
      });
    }

    return () => {
      socket.off("receiveMessage");
    };
  }, [user, conversationId]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await getMessages(conversationId, token);
      setMessages(data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load chat");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    const text = newMessage.trim();
    if (!text) return;

    try {
      const message = await sendMessage(
        { conversationId, senderId: user._id, text },
        token
      );

      socket.emit("sendMessage", message);

      setMessages((prev) => [...prev, message]);
      setNewMessage("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message");
    }
  };

  if (!user) return <Loader message="Loading chat..." />;
  if (loading) return <Loader message="Loading conversation..." />;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft">
        <h1 className="text-3xl font-bold">Chat</h1>
        {error && (
          <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </div>
        )}
      </div>

      <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft">
        {messages.length === 0 ? (
          <p className="text-slate-400">No messages yet. Send the first one.</p>
        ) : (
          messages.map((message) => {
            const isMine = message.senderId?.toString() === user._id;
            return (
              <div
                key={message._id}
                className={`max-w-[85%] rounded-3xl px-4 py-3 ${
                  isMine
                    ? "ml-auto bg-brand-500/15 text-white"
                    : "bg-slate-800/80 text-slate-200"
                }`}
              >
                <div className="text-xs text-slate-400">
                  {isMine ? "You" : "Senior"}
                </div>
                <div className="mt-2 whitespace-pre-wrap">{message.text}</div>
                <div className="mt-2 text-right text-xs text-slate-500">
                  {new Date(message.createdAt).toLocaleString()}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          rows={4}
          className="w-full rounded-3xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-brand-400 focus:ring-brand-400/20"
        />
        <button
          onClick={handleSend}
          className="mt-4 rounded-3xl bg-brand-500 px-4 py-3 text-white hover:bg-brand-400"
        >
          Send
        </button>
      </div>
    </div>
  );
}