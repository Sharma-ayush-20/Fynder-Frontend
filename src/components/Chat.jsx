import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, MoreVertical } from "lucide-react";
import { createSocketConnection } from "../utils/socket";

function Chat() {
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user);
  const userId = user?._id;
  const { targetUserId } = useParams();
  // console.log(targetUserId)

  const [messages, setMessages] = useState([]); //all messages
  const [messageInput, setMessageInput] = useState("");//current message input
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!messageInput.trim()) return;

    const newMsgObj = {
      firstName: user?.firstName,
      userId,
      targetUserId,
      text: messageInput,
    };

    const socket = createSocketConnection()
    socket.emit("sendMessage", newMsgObj)

    // setMessages((prev) => [...prev, newMsgObj]);
    // setMessageInput("");
  };

  useEffect(() => {
    if (!userId) return;
    //create socket connection
    const socket = createSocketConnection();
    //As soon as the page load, the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });

    //received the message 
    socket.on("messageReceived", ({firstName, text}) => {
      console.log(firstName + ": " + text)
      setMessages(messages => [...messages, { firstName, text }])
      setMessageInput("")
    })

    //socket disconnect
    return () => socket.disconnect();
  }, [userId, targetUserId]);

  return (
    <>
      <div className="flex-1 flex justify-center overflow-hidden sm:mt-0 mt-5">
        <div
          className="w-full h-[calc(100vh-8rem)] flex flex-col 
          bg-base-100 dark:bg-base-200 shadow-md 
          overflow-hidden rounded-xl border border-base-300"
        >
          {/* Header */}
          <div
            className="flex items-center gap-2 px-4 py-3 
            bg-base-100 dark:bg-base-300 
            backdrop-blur-md border-b border-base-300 
            shadow-sm flex-none z-30"
          >
            <button
              className="btn btn-ghost btn-xs rounded-full"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} />
            </button>

            <div className="avatar">
              <div className="w-10 rounded-full ring-2 ring-secondary">
                {user?.photoUrl ? (
                  <img src={user.photoUrl} alt="avatar" />
                ) : (
                  <div className="bg-secondary text-secondary-content font-semibold flex justify-center items-center w-full h-full">
                    {user?.firstName?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-[11px] text-success">Online</p>
            </div>

            <MoreVertical className="ml-auto opacity-80" size={18} />
          </div>

          {/* Messages */}
          <div
            className="flex-1 px-4 py-3 overflow-y-auto space-y-3 
                bg-base-200"
          >
            {messages.map((m, index) => (
              <div
                // key={m?.id}
                key={index}
                className={`chat ${
                  m?.sender === "me" ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble px-4 py-2 text-sm font-medium shadow-md
                ${
                  m?.sender === "me"
                    ? "bg-[#4CAF50] text-white"
                    : "bg-[#2196F3] text-white"
                }
                `}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef}></div>
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-4 py-3 bg-base-100 border-t border-base-300 shadow-md">
            <input
              type="text"
              placeholder="Message"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="input w-full rounded bg-base-200 px-4 py-2"
            />

            <button
              onClick={handleSend}
              className="btn btn-circle btn-sm shadow bg-[#3A8DFF] hover:bg-[#1F6FE8] text-white"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
