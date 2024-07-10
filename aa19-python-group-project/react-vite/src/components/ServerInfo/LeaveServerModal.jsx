
import { useDispatch,useSelector } from "react-redux";
import { useState} from "react";
import { useModal } from "../../context/Modal";
import { thunkLeaveServer } from '../../redux/servers';

const LeaveServerModal = (serverId) => {
    const servId= Object.values(serverId)
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const username = useSelector((state)=> state.session.user.username);
    const [serverName] = useState(`${username}'s Server`);

    const handleLeave = async (e) => {
        e.preventDefault();
        dispatch(thunkLeaveServer(servId))
        closeModal()
    }
    return (
        <div className='modal-login'>
        <h1>Leave {serverName}?</h1>
        <h5>Your are about to leave {serverName}, are you sure?</h5>
        

          <div className="buttons-container">
          <button onClick={closeModal} className="submit-btn" >No</button>
        <button onClick={handleLeave} className="button-leave" >Leave</button>
        </div>
        
        <span className="sp sp-t"></span>
			<span className="sp sp-r"></span>
			<span className="sp sp-b"></span>
			<span className="sp sp-l"></span>

        </div>
    )
}

export default LeaveServerModal
