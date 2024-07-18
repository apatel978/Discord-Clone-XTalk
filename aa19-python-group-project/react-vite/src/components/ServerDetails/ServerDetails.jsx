import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { thunkServerById } from '../../redux/servers';
import { thunkGetAllChannels } from '../../redux/channels';
import ServerInfo from '../ServerInfo/ServerInfo';

const ServerDetail = ({ serverId }) => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(thunkServerById(Number(serverId)));
    dispatch(thunkGetAllChannels(Number(serverId)));
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
