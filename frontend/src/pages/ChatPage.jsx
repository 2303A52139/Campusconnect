import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import Loader from "../components/Common/Loader";

export default function ChatPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (!user) return <Loader message="Loading chat..." />;
  if (loading) return <Loader message="Loading conversation..." />;

  return (
    <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-soft">
      <h1 className="text-3xl font-bold">CampusConnect Chat</h1>
      <p className="mt-4 text-slate-300">
        Chat is ready. Next step is to connect this page to the selected conversation list instead of a fixed conversation ID.
      </p>
    </div>
  );
}