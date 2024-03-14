import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../app/constants";

const ChatInConversation: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [messages, setMessages] = useState<
        Array<{ textData: string; sender: string }>
    >([]);
    const [newMessage, setNewMessage] = useState<string>("");

    useEffect(() => {
        fetchComunications();
    }, []);

    const fetchComunications = async () => {
        const queryParams = new URLSearchParams(location.search);
        const userId = queryParams.get("userId");
        const conversationId = queryParams.get("conversationId");

        try {
            const conversationData = {
                userId: userId,
                conversationId: conversationId,
            };
            const response = await axios.post(
                `${apiURL}/conversation/get-comunication`,
                conversationData
            );

            if (Array.isArray(response.data.conversation)) {
                setMessages([...response.data.conversation]);
            }
        } catch (error) {
            console.error("Error calling API:", error);
        }
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() !== "") {
            setMessages([
                ...messages,
                { textData: newMessage, sender: "user" },
            ]);
            setNewMessage("");

            const queryParams = new URLSearchParams(location.search);
            const userId = queryParams.get("userId");
            const conversationId = queryParams.get("conversationId");
            const conversationData = {
                sender: userId,
                receiver: userId,
                conversationId: conversationId,
                message: newMessage,
            };
            const response = await axios.post(
                `${apiURL}/sms/send-sms`,
                conversationData
            );
            console.log("response", response);
        }
    };

    const homeHandler = () => {
        navigate("/");
    };

    const conversationHander = () => {
        navigate("/conversation");
    };

    return (
        <>
            <div className="chat-app">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button
                        style={{
                            display:
                                location.pathname === "/" ? "none" : "block",
                        }}
                        className="btn btn-primary ml-auto"
                        onClick={homeHandler}
                    >
                        Home
                    </button>
                    <button
                        className="btn btn-primary ml-auto m-1"
                        onClick={conversationHander}
                    >
                        Conversation
                    </button>
                </nav>

                <div className="chat-window">
                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`message user`}>
                                {message.textData}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </>
    );
};

export default ChatInConversation;
