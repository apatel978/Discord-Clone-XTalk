import { thunkGetAChannelsMessages } from "../../redux/channels";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const ChannelsMessages = ({ channelId }) => {
    // console.log("CHANNELS MESSAGES", messages)
    const dispatch = useDispatch();
    const messages  = useSelector((state) => state.channels[channelId]?.Messages);
    // console.log("Messages: ", messages)

    useEffect(() => {
        dispatch(thunkGetAChannelsMessages(channelId))
    }, [dispatch, channelId])

    return (
        <>
            <div className={`channels-container`}>
                <span>Messages</span>
                {messages?.map((message) => (
                     <div key={message.id}>
                         <span>{message.message}</span>
                     </div>
                ))}
            </div>
        </>
    )
}


export default ChannelsMessages;
