import { thunkGetAChannelsMessages } from "../../redux/channels";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from 'socket.io-client';

const socket = io('http://localhost:8000');
const ChannelsMessages = ({ channelId }) => {
    // console.log("CHANNELS MESSAGES", messages)
    const dispatch = useDispatch();
    const messages  = useSelector((state) => state.channels[channelId]?.Messages);
    // console.log("Messages: ", messages)
    const [liveMessages, setLiveMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        dispatch(thunkGetAChannelsMessages(channelId))
    }, [dispatch, channelId])

    useEffect(() => {
        // Join the channel room
        socket.emit('join', { username: 'your_username', channel: channelId });

        // Listen for messages
        socket.on('message', (message) => {
            setLiveMessages((prevMessages) => [...prevMessages, message.message]);
        });
             // Cleanup on component unmount
             return () => {
                socket.emit('leave', { username: 'your_username', channel: channelId });
                socket.off('message');
            };
        }, [channelId]);

        const handleSendMessage = () => {
            if (newMessage.trim()) {
                socket.emit('message', { channel: channelId, message: newMessage });
                setNewMessage('');
            }
        };
    

    return (
        <>
            <div className={`channels-container`}>
                <span>Messages</span>
                {messages?.map((message) => (
                     <div key={message.id}>
                         <span>{message.message}</span>
                     </div>
                ))}
                {liveMessages.map((message, index) => (
                <div key={index}>
                    <span>{message}</span>
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
        </>
    )
}


export default ChannelsMessages;
