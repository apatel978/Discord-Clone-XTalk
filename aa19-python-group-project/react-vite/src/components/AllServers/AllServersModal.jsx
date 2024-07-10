
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect} from "react";
import { useModal } from "../../context/Modal";
import { thunkGetAllServers } from "../../redux/allServers";
import { thunkJoinServer } from "../../redux/servers";
const AllServersModal = () => {
    
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const username = useSelector((state)=> state.session.user.username);
    const [serverName] = useState(`${username}'s Server`);
    const allServers = useSelector((state)=> state.allServers)
    const allServersArr = Object.values(allServers)
    
    useEffect(() => {
        dispatch(thunkGetAllServers());
      }, [dispatch]);

    const handleJoin = async (serverId) => {
    
    console.log(serverId)
    dispatch(thunkJoinServer(serverId));
    closeModal();
    }
    const handleDelete = async (e) => {
        e.preventDefault();
        
        closeModal()
    }

    return (
        <div className='modal-login'>
        <h1>Here you can join public Servers </h1>
        <div className="servers-list">
        {allServersArr.length > 0 ? (
          allServersArr.map((server) => (
            <div key={server.id} className="all-server-item">
             <img src={server.preview} onClick={() => handleJoin(server.id)} className='AllServersPreview'/>
               
                    <span id='tooltip'>{server.name}</span>
                
            </div>
          ))
        ) : (
          <p>No public servers available.</p>
        )}
      </div>
        <span className="sp sp-t"></span>
			<span className="sp sp-r"></span>
			<span className="sp sp-b"></span>
			<span className="sp sp-l"></span>

        </div>
    )
}

export default AllServersModal