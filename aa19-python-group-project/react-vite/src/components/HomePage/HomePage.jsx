// src/components/HomePage/HomePage.js
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { thunkGetAllServers } from '../../redux/servers';
import { thunkGetAllChannels } from '../../redux/channels';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import ServerPreviewTile from './ServerPreviewTiles';
import ProfileButton from '../../components/Navigation/ProfileButton'
import CreateServerModal from '../CreateServerModal/CreateServerModal';

import './HomePage.css'

const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.session.user);
  const servers = useSelector((state)=>state.servers);
  // const channels = useSelector((state)=> state.channels);
  let serverList = Object.values(servers)
  console.log(serverList)

  useEffect(() => {
    dispatch(thunkGetAllServers());
    dispatch(thunkGetAllChannels(2));
  }, [dispatch]);


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
  </div>
)}


export default HomePage;
