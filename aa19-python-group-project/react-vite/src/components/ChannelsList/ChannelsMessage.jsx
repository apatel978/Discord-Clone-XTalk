import { thunkGetAChannelsMessages } from "../../redux/channels";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from 'socket.io-client';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import EmojiModal from "../Reactions";


const ChannelsMessages = ({ channelId }) => {
    const dispatch = useDispatch();
    // const messages = useSelector((state) => state.channels[channelId]?.Messages || []);
    const user = useSelector((state) => state.session.user);
    const channel = useSelector((state) => state.channels[channelId])
    const [socket, setSocket] = useState(undefined)

    // const [liveMessages, setLiveMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [allMessages, setAllMessages] = useState();

    useEffect(() => {
        dispatch(thunkGetAChannelsMessages(channelId))
        .then((messages) => {
            setAllMessages([...messages])
        })
    }, [dispatch, channelId]);


    useEffect(() => {

        const new_socket = io();

        new_socket.emit('join', { username: user.username, channel: channelId });

        new_socket.on('message', (message) => {
            setAllMessages((prevMessages) => [...prevMessages, message]);
        });

        new_socket.on('reaction'), (reaction) => {
            setAllMessages((prevMessages) => {
                let message = prevMessages?.filter((item) => reaction?.messageId === item?.id)
                message[0].reactions.push(reaction)
            })
        }


        setSocket(new_socket)

        return () => {
            new_socket.emit('leave', { username: user.username, channel: channelId });
            new_socket.off('message');
            new_socket.off('reaction');
        };
    }, [channelId, user.username, setSocket]);

    const handleSendMessage = () => {
        if (socket && newMessage.trim()) {
            socket.emit('message', { channel: channelId, message: newMessage});
            setNewMessage('');
        }
    };

    // const allMessages = [
    //     ...messages,
    //     ...liveMessages,
    // ];

    return (
        <div className="channels-container">
            <div className="messages-row1">
                <h2>
                    {`# ${channel.name}`}
                </h2>
            </div>
            {/* <span>Messages</span> */}
            <div className="messages-row2">
                {allMessages?.map((message, index) => (
                    <div key={message.id || `live-${index}`} className='singleMessageDiv'>
                        <div>
                            <span>{message.messageOwner}</span>
                        </div>
                        <span>{message.message}</span>
                        <div>
                            {message?.reactions?.map((reaction) => (
                                <button key={reaction.id} type='submit'>
                                    <img src={reaction.reaction}/>
                                </button>
                            ))}
                        </div>
                        <div>
                            <OpenModalButton
                                modalComponent={<EmojiModal channelId={channelId} message={message}/>}
                                className='create-channel-button'
                                buttonText={"Add Reaction"}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="messages-row3">
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
