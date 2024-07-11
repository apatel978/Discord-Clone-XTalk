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
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const [selectedServerId, setSelectedServerId] = useState(null);
  const user = useSelector((state) => state.session.user);
  const servers = useSelector((state) => state.servers);

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
      <ProfileButton user={user} />
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
        <div className="profile-area">
          <ServerDetails serverId={selectedServerId} />
          {user.username}
        </div>
      )}
    </div>
  );
};

export default HomePage;
