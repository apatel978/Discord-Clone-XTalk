import { Link } from "react-router-dom"

const ChannelsList = ({ channels }) => {
    return (
        <>
            <div className={`channels-container`}>
                <span>Channels</span>
                {channels?.map((channel) => (
                     <Link key={`${channel.id}`} className="ChannelLink" to={`/channels/${channel.id}`}>
                     <div>
                         <span id=''>{channel.name}</span>
                     </div>
                 </Link>
                ))}
            </div>
        </>
    )
}


export default ChannelsList;
