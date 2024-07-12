import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { thunkGetServers, thunkServerById } from '../../redux/servers';
import { thunkGetAllChannels } from '../../redux/channels';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import ServerPreviewTile from './ServerPreviewTiles';
import ProfileButton from '../../components/Navigation/ProfileButton';
import CreateServerModal from '../CreateServerModal/CreateServerModal';
import AllServersModal from '../AllServers/AllServersModal';
import ServerDetails from '../ServerDetails/ServerDetails';
import MemberList from '../MembersList/MembersList';
import ChannelsMessages from '../ChannelsList/ChannelsMessage';
import ChannelsList from '../ChannelsList/ChannelsList';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const [selectedServerId, setSelectedServerId] = useState(null);
  const user = useSelector((state) => state.session.user);
  const servers = useSelector((state) => state.servers);
  const [ channelId, setChannelId ] = useState(null)
  const channels = useSelector((state) => state.channels);
  let allChannels = Object.values(channels);
  let serverChannels = allChannels.filter((channel) => channel.serverId === Number(selectedServerId));
  // const members = useSelector((state) => state.servers[Number(serverId)]?.members);

  let serverList = Object.values(servers);

  useEffect(() => {
    dispatch(thunkGetServers());
    if (selectedServerId !== null) {
      dispatch(thunkServerById(selectedServerId));
      dispatch(thunkGetAllChannels(selectedServerId));
    }
  }, [selectedServerId, dispatch]);

  return (
    <div className='main-page'>
      
        <div className='serverPreviewContainer'>
          {serverList.map((server) => (
            <ServerPreviewTile key={`${server.id}`} server={server} onClick={() => setSelectedServerId(server.id)} />
          ))}
          <OpenModalMenuItem
            modalComponent={<CreateServerModal />}
            itemText={<img src='../../../images/plus2.png' className='serverPreview' alt="Plus Sign" />}
          />
          <OpenModalMenuItem
            modalComponent={<AllServersModal />}
            itemText={<img src='../../../images/allServers.png' className='serverPreview' alt="All Servers" />}
          />
        </div>
      {selectedServerId === null ? (<>
        <div>
          Hi! Pick a server to get started! HAHA {':)'}
        </div>
        </>
      ) : (
        <>
        <div className='column2'>
          <ServerDetails serverId={selectedServerId} />
         
          <div>
          {serverChannels.map((channel) => (
        <div key={`${channel.id}`} onClick={() => setChannelId(channel.id)}>
          {channel.name}
        </div>
      ))}
      <ChannelsList channels={serverChannels} />
          </div>

          <div className="profile-area">
          <ProfileButton user={user} />
          {user.username}
          </div>
        </div>
        <div className='column3'>
        <ChannelsMessages channelId={channelId}/>
        </div>
        <div className='column4'> <MemberList members={servers[selectedServerId]?.members} />
        </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
