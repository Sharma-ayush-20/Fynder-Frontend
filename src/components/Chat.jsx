import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Send, MoreVertical } from "lucide-react";
import axios from "axios";
import { createSocketConnection } from "../utils/socket";
import { baseUrl } from "../utils/constants";

function Chat() {
  const navigate = useNavigate();
  const loggedInUser = useSelector((store) => store?.user);
  const loggedInUserId = loggedInUser?._id;
  const { targetUserId } = useParams();
  const location = useLocation();
  const preloadedUser = location.state?.user || null;

  const [messages, setMessages] = useState([]);
  const [targetUser, setTargetUser] = useState(preloadedUser);
  const [messageInput, setMessageInput] = useState("");
  const [isOnline, setIsOnline] = useState(false);

  const endRef = useRef(null);
  const socketRef = useRef(null);

  // Scroll bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Create socket only once
  useEffect(() => {
    if (!loggedInUserId) return;
    socketRef.current = createSocketConnection();
    socketRef.current.emit("userOnline", loggedInUserId);

    return () => socketRef.current.disconnect();
  }, [loggedInUserId]);

  // Fetch only Messages from DB
  useEffect(() => {
    if (!loggedInUserId || !targetUserId) return;

    axios.get(`${baseUrl}/chat/${targetUserId}`, { withCredentials: true })
      .then((res) => {
        const chatData = res.data.chat;
        if (chatData) {
          setMessages(chatData.messages);

          // If user wasn't preloaded, then add from API
          if (!preloadedUser) {
            const other = chatData.participants.find((p) => p._id !== loggedInUserId);
            setTargetUser(other);
          }
        }
      })
      .catch(console.log);
  }, [loggedInUserId, targetUserId]);

  // Join room and listen messages
  useEffect(() => {
    if (!loggedInUserId) return;

    socketRef.current.emit("joinChat", {
      firstName: loggedInUser?.firstName,
      userId: loggedInUserId,
      targetUserId,
    });

    socketRef.current.on("messageReceived", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socketRef.current.off("messageReceived");
  }, [loggedInUserId, targetUserId]);

  const handleSend = () => {
    if (!messageInput.trim()) return;
    socketRef.current.emit("sendMessage", {
      userId: loggedInUserId,
      text: messageInput,
      targetUserId,
    });
    setMessageInput("");
  };

  // Online / Offline
  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on("updateOnlineUsers", (users) => {
      setIsOnline(users.includes(targetUserId));
    });

    return () => socketRef.current.off("updateOnlineUsers");
  }, [targetUserId]);

  return (
    <div className="flex-1 flex justify-center overflow-hidden sm:mt-0 mt-5">
      <div className="w-full h-[calc(100vh-8rem)] flex flex-col bg-base-100 dark:bg-base-200 shadow-md rounded-xl border">

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-base-100 dark:bg-base-300 border-b shadow-sm">
          <button className="btn btn-ghost btn-xs rounded-full" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
          </button>

          {targetUser ? (
            <>
              <div className="avatar">
                <div className="w-10 rounded-full ring-2 ring-secondary">
                  {targetUser.photoUrl ? (
                    <img src={targetUser.photoUrl} alt="avatar" />
                  ) : (
                    <div className="bg-secondary text-white flex items-center justify-center w-full h-full">
                      {targetUser.firstName?.[0]?.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  {targetUser.firstName} {targetUser.lastName}
                </h3>
                <p className={`text-[11px] font-semibold ${isOnline ? "text-success" : "text-error"}`}>
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </>
          ) : (
            <p className="text-xs text-gray-400">Loading...</p>
          )}

          <MoreVertical className="ml-auto opacity-75" />
        </div>

        {/* Messages */}
        <div className="flex-1 px-4 py-3 overflow-y-auto space-y-2 bg-base-200">
          {messages.map((m, idx) => {
            const isMine = (m.senderId?._id || m.senderId) === loggedInUserId;
            return (
              <div key={idx} className={`flex ${isMine ? "justify-end" : "justify-start"} mb-1`}>
                <div className="max-w-[70%]">
                  
                  {!isMine && (
                    <p className="text-[10px] text-primary font-semibold mb-1 ml-1">
                      {targetUser?.firstName}
                    </p>
                  )}

                  <div className={`rounded-2xl px-4 py-2 text-sm shadow transition
                    ${isMine ? "bg-[#4CAF50]" : "bg-[#2196F3]"} text-white`}>
                    {m.text}
                  </div>

                </div>
              </div>
            );
          })}
          <div ref={endRef}></div>
        </div>

        {/* Input */}
        <div className="px-4 py-3 bg-base-100 border-t flex gap-2">
          <input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Message…"
            className="input w-full bg-base-200 px-4"
          />
          <button className="btn btn-circle bg-[#3A8DFF] text-white" onClick={handleSend}>
            <Send size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}

export default Chat;
