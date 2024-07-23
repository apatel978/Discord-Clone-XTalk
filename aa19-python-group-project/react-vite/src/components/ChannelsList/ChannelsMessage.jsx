// import { thunkGetAChannelsMessages } from "../../redux/channels";
// import { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import io from 'socket.io-client';
// import OpenModalButton from "../OpenModalButton/OpenModalButton";
// import EmojiModal from "../Reactions";

// const ChannelsMessages = ({ channelId }) => {
//     const dispatch = useDispatch();
//     const user = useSelector((state) => state.session.user);
//     const channel = useSelector((state) => state.channels[channelId]);
//     const [socket, setSocket] = useState(undefined);
//     const [newMessage, setNewMessage] = useState('');
//     const [allMessages, setAllMessages] = useState([]);
//     const messagesEndRef = useRef(null); // Reference to the end of the messages container

//     useEffect(() => {
//         dispatch(thunkGetAChannelsMessages(channelId))
//             .then((messages) => {
//                 setAllMessages([...messages]);
//             });
//     }, [dispatch, channelId]);

//     useEffect(() => {
//         const new_socket = io();

//         new_socket.emit('join', { username: user.username, channel: channelId });

//         new_socket.on('message', (message) => {
//             setAllMessages((prevMessages) => [...prevMessages, message]);
//         });

//         new_socket.on('reaction', (reaction) => {
//             setAllMessages((prevMessages) => {
//                 return prevMessages.map(message => {
//                     if (message.id === reaction?.messageId) {
//                         let updatedReactions = message.reactions ? [...message.reactions] : [];
//                         updatedReactions.push(reaction);
//                         return { ...message, reactions: updatedReactions };
//                     } else {
//                         return message;
//                     }
//                 });
//             });
//         });

//         setSocket(new_socket);

//         return () => {
//             new_socket.emit('leave', { username: user.username, channel: channelId });
//             new_socket.off('message');
//             new_socket.off('reaction');
//         };
//     }, [channelId, user.username]);

//     useEffect(() => {
//         // Scroll to the bottom whenever the messages change
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [allMessages]);

//     const handleSendMessage = () => {
//         if (socket && newMessage.trim()) {
//             socket.emit('message', { channel: channelId, message: newMessage });
//             setNewMessage('');
//         }
//     };

//     return (
//         <>
//             <div className="messages-row1">
//                 <h2>
//                     {`# ${channel?.name}`}
//                 </h2>
//             </div>
//             <div className="messages-container">
//                 <div className="messages-row2">
//                     {allMessages?.map((message, index) => (
//                         <div key={message.id || `live-${index}`} className='singleMessageDiv'>
//                             <div className="message-name">
//                                 {message?.messageOwner}
//                             </div>
//                             <span>{message.message}</span>
//                             <div className="reactions-cont">
//                                 {message?.reactions?.map((reaction) => (
//                                     <div className="reac" key={reaction.id} type='submit'>
//                                         <img id='reaction-id' src={reaction.reaction} alt="reaction"/>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div className='reaction-button'>
//                                 <OpenModalButton
//                                     modalComponent={<EmojiModal channelId={channelId} message={message}/>}
//                                     className='create-channel-button'
//                                     buttonText={"Add Reaction"}
//                                 />
//                             </div>
//                         </div>
//                     ))}
//                     <div ref={messagesEndRef} />
//                 </div>
//             </div>
//             <div className="messages-row3">
//                 <input
//                     type="text"
//                     className="input-field"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     placeholder="Type a message"
//                 />

//                 <button id='prof' onClick={handleSendMessage}>Send</button>

//             </div>
//         </>
//     );
// };

// export default ChannelsMessages;







import { thunkGetAChannelsMessages } from "../../redux/channels";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from 'socket.io-client';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import EmojiModal from "../Reactions";

const ChannelsMessages = ({ channelId }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const channel = useSelector((state) => state.channels[channelId]);
    const [socket, setSocket] = useState(undefined);
    const [newMessage, setNewMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        dispatch(thunkGetAChannelsMessages(channelId))
            .then((messages) => {
                setAllMessages([...messages]);
            });
    }, [dispatch, channelId]);

    useEffect(() => {
        const new_socket = io();

        new_socket.emit('join', { username: user.username, channel: channelId });

        new_socket.on('message', (message) => {
            setAllMessages((prevMessages) => [...prevMessages, message]);
        });

        new_socket.on('reaction', (reaction) => {
            setAllMessages((prevMessages) => {
                return prevMessages.map(message => {
                    if (message.id === reaction?.messageId) {
                        let updatedReactions = message.reactions ? [...message.reactions] : [];
                        updatedReactions.push(reaction);
                        return { ...message, reactions: updatedReactions };
                    } else {
                        return message;
                    }
                });
            });
        });

        setSocket(new_socket);

        return () => {
            new_socket.emit('leave', { username: user.username, channel: channelId });
            new_socket.off('message');
            new_socket.off('reaction');
        };
    }, [channelId, user.username]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [allMessages]);

    const handleSendMessage = () => {
        if (socket && newMessage.trim()) {
            socket.emit('message', { channel: channelId, message: newMessage });
            setNewMessage('');
        }
    };

    // Function to count reactions
    const countReactions = (reactions) => {
        const reactionCounts = {};
        reactions.forEach((reaction) => {
            if (reactionCounts[reaction.reaction]) {
                reactionCounts[reaction.reaction]++;
            } else {
                reactionCounts[reaction.reaction] = 1;
            }
        });
        return reactionCounts;
    };

    return (
        <>
            <div className="messages-row1">
                <h2>
                    {`# ${channel?.name}`}
                </h2>
            </div>
            <div className="messages-container">
                <div className="messages-row2">
                    {allMessages?.map((message, index) => (
                        <div key={message.id || `live-${index}`} className='singleMessageDiv'>
                            <div className="message-name">
                                <span>{message.messageOwner}</span>
                            </div>
                            <span>{message.message}</span>
                            <div className="reactions-cont">
                                {Object.entries(countReactions(message.reactions || [])).map(([reaction, count]) => (
                                    <div className="reac" key={reaction} type='submit'>
                                        <img  id='reaction-id' src={reaction} alt="reaction" />
                                        <span id='count'>{count}</span>
                                    </div>
                                ))}
                            </div>
                            <div className='reaction-button'>
                                <OpenModalButton
                                    modalComponent={<EmojiModal channelId={channelId} message={message}/>}
                                    className='create-channel-button'
                                    buttonText={"Add Reaction"}
                                />
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="messages-row3">
                <input
                    type="text"
                    className="input-field"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button id='prof' onClick={handleSendMessage}>Send</button>
            </div>
        </>
    );
};

export default ChannelsMessages;
