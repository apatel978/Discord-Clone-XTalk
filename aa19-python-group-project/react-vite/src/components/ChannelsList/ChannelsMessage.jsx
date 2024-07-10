
const ChannelsList = ({ messages }) => {
    console.log("CHANNELS MESSAGES", messages)
    return (
        <>
            <div className={`channels-container`}>
                <span>Messages</span>
                {messages?.map((message) => (
                     <div>
                         <span>{message.message}</span>
                     </div>
                ))}
            </div>
        </>
    )
}


export default ChannelsList;
