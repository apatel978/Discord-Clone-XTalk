

function ChannelsList() {


    const channels = useSelector((state)=> state.channels);
    let allChannels = Object.values(channels);
    console.log(serverList)
    console.log('all channels: ', allChannels)
    let serverChannels = allChannels.filter((channel) => channel.serverId === Number(serverId));
    console.log('filtered: ', serverChannels)


    useEffect(() => {
        dispatch(thunkGetAllServers());
        dispatch(thunkServerById(Number(serverId)));
        dispatch(thunkGetAllChannels(Number(serverId)));
      }, [dispatch, serverId]);

    return (
        <>
            <div className={`channels-container`}>
                {/* { Object.values(spots).map((spot) => (
                    <SpotTile key={`${spot.id}`} spot={spot} /> */}
                {/* ))} */}
            </div>
        </>
    )
}


export default ChannelsList;
