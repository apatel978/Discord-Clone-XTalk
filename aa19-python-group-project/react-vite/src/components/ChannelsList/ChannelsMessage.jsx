import { thunkGetAChannelsMessages, thunkCreateChannelMessage } from "../../redux/channels";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const ChannelsMessages = ({ channelId }) => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.channels[channelId]?.Messages || []);
    const user = useSelector((state) => state.session.user);

    const [liveMessages, setLiveMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        dispatch(thunkGetAChannelsMessages(channelId));
    }, [dispatch, channelId]);

    useEffect(() => {
        socket.emit('join', { username: user.username, channel: channelId });

        socket.on('message', (message) => {
            setLiveMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.emit('leave', { username: user.username, channel: channelId });
            socket.off('message');
        };
    }, [channelId, user.username]);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            try {
                const messageObj = await dispatch(thunkCreateChannelMessage(channelId, newMessage));
                socket.emit('new_message', messageObj);
                setNewMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const allMessages = [
        ...messages,
        ...liveMessages,
    ];

    return (
        <div className="channels-container">
            <span>Messages</span>
            {allMessages.map((message, index) => (
                <div key={message.id || `live-${index}`}>
                    <span>{message.message}</span>
                </div>
            ))}
            <div>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChannelsMessages;
