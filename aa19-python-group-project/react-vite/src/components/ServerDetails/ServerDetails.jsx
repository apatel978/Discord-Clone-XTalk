import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { thunkGetAllServers, thunkServerById } from '../../redux/servers';
import { thunkGetAllChannels } from '../../redux/channels';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import ServerPreviewTile from '../HomePage/ServerPreviewTiles';
import ChannelsList from '../ChannelsList/ChannelsList';
import MemberList from '../MembersList/MembersList';
import ProfileButton from '../../components/Navigation/ProfileButton'
import CreateServerModal from '../CreateServerModal/CreateServerModal';
import { useParams } from 'react-router-dom';
import ServerInfo from '../ServerInfo/ServerInfo';
// import './HomePage.css'

const ServerDetail = () => {
    const { serverId } = useParams()
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.session.user);
    const servers = useSelector((state)=>state.servers);
    let serverList = Object.values(servers);
    const channels = useSelector((state)=> state.channels);
    let allChannels = Object.values(channels);
    // console.log(serverList)
    // console.log('all channels: ', allChannels)
    let serverChannels = allChannels.filter((channel) => channel.serverId === Number(serverId));

    // console.log('filtered: ', serverChannels);
    const members = useSelector((state) => state.servers[Number(serverId)]?.members)
    // console.log(members)
  

    useEffect(() => {
      dispatch(thunkGetAllServers());
      dispatch(thunkServerById(Number(serverId)));
      dispatch(thunkGetAllChannels(Number(serverId)));
    }, [dispatch, serverId]);
    // console.log(servers)


    return (
    <div className='main-page'>
      {/* <h1>Welcome to the Home Page!</h1> */}
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
       
          <ServerInfo />
        
      </div>
      <MemberList members={members}/>
      <ChannelsList channels={serverChannels} />
    </div>
  )
}


export default ServerDetail
