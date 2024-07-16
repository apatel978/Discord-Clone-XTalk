
import { useDispatch,useSelector } from "react-redux";

import { useModal } from "../../context/Modal";
import { thunkLeaveServer } from '../../redux/servers';

const LeaveServerModal = ({serverId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const server = useSelector((state)=> state.servers[serverId]);


    const handleLeave = async (e) => {
        e.preventDefault();
        dispatch(thunkLeaveServer(serverId))
        closeModal()
    }
    return (
        <div className='modal-login'>
        <h1>Leave {server.name}?</h1>
        <h5>Your are about to leave {server.name}, are you sure?</h5>


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
