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
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import CreateChannel from '../CRUDChannels/CreateChannel';
import EditChannel from '../CRUDChannels/EditChannel';
import DeleteChannelModal from '../CRUDChannels/DeleteChannel';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const [selectedServerId, setSelectedServerId] = useState(null);
  const user = useSelector((state) => state.session.user);
  const servers = useSelector((state) => state.servers);
  const [ channelId, setChannelId ] = useState(null)
  const [update, setUpdate] = useState(false);
  const channels = useSelector((state) => state.channels);
  const server = useSelector((store)=>store.servers[selectedServerId])


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
    setUpdate(false)
  }, [selectedServerId, dispatch, update]);

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
            itemText={<img src='../../../images/allservers.png' className='serverPreview' alt="All Servers" />}
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
          <div>
            <ServerDetails serverId={selectedServerId} />
            <div>
            {serverChannels.map((channel) => (
              <div key={`${channel.id}`} className='channel-container' onClick={() => setChannelId(channel.id)}>
                {`# ${channel.name}`}
                <div className='channel-buttons'>
                  {user && (user?.id === server?.ownerId || user?.id === channel.userId) &&
                      <OpenModalButton
                          modalComponent={<EditChannel channelId={channel.id} setUpdate={setUpdate} serverChannels={serverChannels}/>}
                          className={'create-channel-button'}
                          buttonText={"Edit"}
                      />
                    }
                    {user && (user?.id === server?.ownerId || user?.id === channel.userId) &&
                    <OpenModalButton
                        modalComponent={<DeleteChannelModal channelId={channel.id} setUpdate={setUpdate} serverChannels={serverChannels}/>}
                        className={'create-channel-button'}
                        buttonText={"Delete"}
                    />
                    }
                </div>
              </div>
        ))}
          {user && (user?.id === server?.ownerId) &&
            <OpenModalButton
            modalComponent={<CreateChannel serverId={selectedServerId} setUpdate={setUpdate}/>}
            className={'create-channel-button'}
            buttonText={"+"}
      />}
            </div>
          </div>
          <div className="profile-area">
            <ProfileButton user={user} />
            {user.username}
          </div>
        </div>

        <div className='column3'>
          {!channelId ? (<div>
            <p>Hi! Pick a channel!</p>
          </div>) : (
            <ChannelsMessages channelId={channelId}/>
          )}
        </div>

        <div className='column4'> <MemberList members={servers[selectedServerId]?.members} />
        </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
