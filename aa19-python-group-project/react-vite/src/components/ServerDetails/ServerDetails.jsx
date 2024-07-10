import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { thunkServerById } from '../../redux/servers';
import { thunkGetAllChannels } from '../../redux/channels';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import ServerPreviewTile from '../HomePage/ServerPreviewTiles';
import ChannelsList from '../ChannelsList/ChannelsList';
import MemberList from '../MembersList/MembersList';
import ProfileButton from '../../components/Navigation/ProfileButton';
import CreateServerModal from '../CreateServerModal/CreateServerModal';
import ServerInfo from '../ServerInfo/ServerInfo';
import AllServersModal from '../AllServers/AllServersModal';

const ServerDetail = ({ serverId, setSelectedServerId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const servers = useSelector((state) => state.servers);
  let serverList = Object.values(servers);
  const channels = useSelector((state) => state.channels);
  let allChannels = Object.values(channels);
  let serverChannels = allChannels.filter((channel) => channel.serverId === Number(serverId));
  const members = useSelector((state) => state.servers[Number(serverId)]?.members);

  useEffect(() => {
    dispatch(thunkServerById(Number(serverId)));
    dispatch(thunkGetAllChannels(Number(serverId)));
  }, [dispatch, serverId]);

  return (
    <div className='main-page'>
      <div className='serverPreviewContainer'>
        {serverList.map((server) => (
          <ServerPreviewTile key={`${server.id}`} server={server}   />
        ))}
        <OpenModalMenuItem
          modalComponent={<AllServersModal />}
          itemText={<img src='../../../images/allServers.png' className='serverPreview' alt="All Servers" />}
        />
        <OpenModalMenuItem
          modalComponent={<CreateServerModal />}
          itemText={<img src='../../../images/plus2.png' className='serverPreview' alt="Create Server" />}
        />
      </div>
      <div className="profile-area">
        <ProfileButton user={user} />
        {user.username}
       
        <ServerInfo serverId={serverId} />
      </div>
      <MemberList members={members} />
      <ChannelsList channels={serverChannels} />
    </div>
  );
};

export default ServerDetail;
