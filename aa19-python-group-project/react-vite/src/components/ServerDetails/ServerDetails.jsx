import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useCallback } from "react";
import { thunkServerById } from '../../redux/servers';
import { thunkGetAllChannels } from '../../redux/channels';
import ProfileButton from '../../components/Navigation/ProfileButton';
import ServerInfo from '../ServerInfo/ServerInfo';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import CreateChannel from '../CRUDChannels/CreateChannel';

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
    <>
      <div className="server-info">
        <ServerInfo serverId={serverId} />
      </div>

      </>
  );
};

export default ServerDetail;
