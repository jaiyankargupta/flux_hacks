import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import '../../styles/ChatWidget.css';

const ENDPOINT = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5001';

const ChatWidget = ({ currentUser, targetUser }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);

    const roomId = [currentUser?._id, targetUser?._id].sort().join('_');

    useEffect(() => {
        if (!isOpen || !currentUser || !targetUser) return;

        // Initialize Socket
        const newSocket = io(ENDPOINT);
        setSocket(newSocket);

        // Join Room
        newSocket.emit('join_room', roomId);

        // Load Chat History
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const res = await axios.get(`${import.meta.env.VITE_API_URL}/messages/${targetUser._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessageList(res.data.data);
                scrollToBottom();
            } catch (err) {
                console.error("Failed to load chat history", err);
            }
        };
        fetchHistory();

        // Listen for messages
        newSocket.on('receive_message', (data) => {
            setMessageList((list) => [...list, {
                sender: data.author,
                content: data.message,
                createdAt: new Date().toISOString() // temporary timestamp
            }]);
            scrollToBottom();
        });

        return () => {
            newSocket.disconnect();
        };
    }, [isOpen, roomId, currentUser, targetUser]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Scroll to bottom on new messages
    useEffect(() => {
        scrollToBottom();
    }, [messageList]);

    const sendMessage = async () => {
        if (message !== '' && socket) {
            const messageData = {
                room: roomId,
                author: currentUser._id,
                receiver: targetUser._id,
                message: message,
                time: new Date().toISOString(),
            };

            await socket.emit('send_message', messageData);

            setMessageList((list) => [...list, {
                sender: currentUser._id,
                content: message,
                createdAt: new Date().toISOString()
            }]);

            setMessage('');
        }
    };

    if (!currentUser || !targetUser) {
        if (isOpen) {
            return (
                <div className="chat-widget">
                    <div className="chat-window">
                        <div className="chat-header">
                            <h3>Messaging</h3>
                            <button onClick={() => setIsOpen(false)} className="close-btn">×</button>
                        </div>
                        <div className="no-chat-selected">
                            <p>Select a provider/patient to start chatting.</p>
                        </div>
                    </div>
                </div>
            )
        }
        return null; // Don't show button if no context
    }

    return (
        <div className="chat-widget">
            {!isOpen && (
                <button className="chat-button" onClick={() => setIsOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </button>
            )}

            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <h3>{targetUser.name}</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="close-btn">×</button>
                    </div>

                    <div className="chat-body">
                        {messageList.map((msg, index) => {
                            const isSentByMe = msg.sender === currentUser._id;
                            return (
                                <div
                                    key={index}
                                    className={`message ${isSentByMe ? 'sent' : 'received'}`}
                                >
                                    <div className="message-content">{msg.content}</div>
                                    <div className="message-meta">
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-footer">
                        <input
                            type="text"
                            value={message}
                            placeholder="Type a message..."
                            className="chat-input"
                            onChange={(event) => setMessage(event.target.value)}
                            onKeyPress={(event) => {
                                event.key === 'Enter' && sendMessage();
                            }}
                        />
                        <button onClick={sendMessage} className="send-btn" disabled={!message.trim()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
