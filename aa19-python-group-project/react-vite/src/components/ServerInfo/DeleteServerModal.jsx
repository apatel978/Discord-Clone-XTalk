
import { useDispatch,useSelector } from "react-redux";
import { useState, useRef} from "react";
import { useModal } from "../../context/Modal";
import { thunkCreateServer } from '../../redux/servers';

const DeleteServerModal = () => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const username = useSelector((state)=> state.session.user.username);
    const [serverName, setServerName] = useState(`${username}'s Server`);

    const handleDelete = async (e) => {
        e.preventDefault();
    }

    return (
        <div className='modal-login'>
        <h1>Delete {serverName}?</h1>
        <h5>Your are about to delete {serverName}, are you sure?</h5>
        

          <div className="buttons-container">
          <button onClick={closeModal} className="submit-btn" >No</button>
        <button onClick={handleDelete} className="button-leave" >Delete</button>
        </div>
        
        <span className="sp sp-t"></span>
			<span className="sp sp-r"></span>
			<span className="sp sp-b"></span>
			<span className="sp sp-l"></span>

        </div>
    )
}

export default DeleteServerModal
