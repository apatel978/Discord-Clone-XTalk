import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useCallback } from "react";
import { thunkServerById } from '../../redux/servers';
import { thunkGetAllChannels } from '../../redux/channels';
// import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
// import ServerPreviewTile from '../HomePage/ServerPreviewTiles';
// import ChannelsList from '../ChannelsList/ChannelsList';
import ChannelsMessages from '../ChannelsList/ChannelsMessage';
import MemberList from '../MembersList/MembersList';
import ProfileButton from '../../components/Navigation/ProfileButton';
// import CreateServerModal from '../CreateServerModal/CreateServerModal';
import ServerInfo from '../ServerInfo/ServerInfo';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import CreateChannel from '../CRUDChannels/CreateChannel';
// import AllServersModal from '../AllServers/AllServersModal';

const ServerDetail = ({ serverId }) => {
  const dispatch = useDispatch();
  const [ channelId, setChannelId ] = useState(null)
  const user = useSelector((state) => state.session.user);
  const [update, setUpdate] = useState(false);
  // const servers = useSelector((state) => state.servers);
  // let serverList = Object.values(servers);
  const channels = useSelector((state) => state.channels);
  let allChannels = Object.values(channels);
  let serverChannels = allChannels.filter((channel) => channel.serverId === Number(serverId));
  const members = useSelector((state) => state.servers[Number(serverId)]?.members);

  // const { current: refChannels } = useRef(serverChannels)

  useEffect(() => {
    dispatch(thunkServerById(Number(serverId)));
    dispatch(thunkGetAllChannels(Number(serverId)));
    setUpdate(false)
  }, [dispatch, serverId]);

  return (
    <div className='main-page'>
      <div className="profile-area">
        <ProfileButton user={user} />
        {user.username}

        <ServerInfo serverId={serverId} />
      </div>
      <MemberList members={members} />
      <div>
        <span>Channels</span>
          {serverChannels.map((channel) => (
            <div key={`${channel.id}`} onClick={() => setChannelId(channel.id)}>
              {channel.name}
            </div>
          ))}
          <OpenModalButton
            modalComponent={<CreateChannel serverId={serverId} setUpdate={setUpdate}/>}
            className={'create-channel-button'}
            buttonText={"+"}
      />
      </div>
      {channelId === null ? (
        <div>Good to see you!</div>
      ) : (
        <ChannelsMessages channelId={channelId}/>
      )}
      {/* <ChannelsList channels={serverChannels} /> */}
    </div>
  );
};

export default ServerDetail;
