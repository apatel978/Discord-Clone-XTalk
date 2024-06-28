// src/components/HomePage/HomePage.js
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { thunkGetAllServers } from '../../redux/servers';
import { thunkGetAllChannels } from '../../redux/channels';
import './HomePage.css'

const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.session.user)
  const servers = useSelector((state)=>state.servers)
  const channels = useSelector((state)=> state.channels)

  useEffect(() => {
    dispatch(thunkGetAllServers(), thunkGetAllChannels(2));
  }, [dispatch]);
  useEffect(() => {
    dispatch(thunkGetAllChannels(2));
  }, [dispatch, 1]);
  // console.log(servers)


  return (
  <div className='main-page'>
  <h1>Welcome to the Home Page!</h1>
  {user.username}
  </div>
)}


export default HomePage;
