import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { thunkGetServers, thunkServerById } from '../../redux/servers';
import { thunkGetAChannelsMessages, thunkGetAllChannels } from '../../redux/channels';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import ServerPreviewTile from '../HomePage/ServerPreviewTiles';
import ChannelsList from '../ChannelsList/ChannelsList';
import ChannelsMessage from '../ChannelsList/ChannelsMessage'
import MemberList from '../MembersList/MembersList';
import ProfileButton from '../../components/Navigation/ProfileButton'
import CreateServerModal from '../CreateServerModal/CreateServerModal';
import { useParams } from 'react-router-dom';


const ChannelsOverview = () => {
    const { channelId } = useParams()
    const dispatch = useDispatch();

    const user = useSelector((state)=> state.session.user);
    const servers = useSelector((state)=>state.servers);

    let serverList = Object.values(servers);

    useEffect(() => {
      dispatch(thunkGetAChannelsMessages(Number(channelId)))
    }, [dispatch, channelId])

    const channels = useSelector((state)=> state.channels);
    let allChannels = Object.values(channels);

    // const serverId = useSelector((state) => state.channels[channelId]?.serverId)
    const channel = useSelector(state => state.channels[channelId])
    const serverId = channel?.serverId
    console.log("Server Id ", serverId)


    let serverChannels = allChannels.filter((channel) => channel.serverId === Number(serverId));
    const members = useSelector((state) => state?.servers[Number(serverId)]?.members)
    const messages = useSelector((state) => state?.channels[channelId]?.Messages)
    console.log("CHANNEL OVERVIEW", messages)

    useEffect(() => {
      dispatch(thunkGetServers())
      .then(() => dispatch(thunkServerById(Number(serverId))))
      .then(() => dispatch(thunkGetAllChannels(Number(serverId))))
    }, [dispatch, channelId, serverId]);



    return (
    <div className='main-page'>

      <div className='serverPreviewContainer'>
        {serverList.map((server) => (
          <ServerPreviewTile key={`${server.id}`}  server={server}/>
        ))}
         <OpenModalMenuItem
        modalComponent={<CreateServerModal />}
        itemText={<img src='../../../images/plus2.png' className='serverPreview' alt="Plus Sign" />}
      />
      </div>
      <div className="profile-area">
        <ProfileButton user={user}/>
        {user.username}
      </div>
      <MemberList members={members}/>
      <ChannelsList channels={serverChannels} />
      <ChannelsMessage messages={messages} />
    </div>
  )
}


export default ChannelsOverview
