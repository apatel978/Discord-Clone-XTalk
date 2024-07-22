import { useDispatch,useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteChannel } from '../../redux/channels';

const DeleteChannelModal = ({ channelId, setUpdate, serverChannels}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user)

    const specificChannel = []
    for (const channel of Object.values(serverChannels)) {
        if (channel.id === channelId) {
            specificChannel.push(channel)
        }
    }

    if (sessionUser) { //checks if user is logged in

        const handleDelete =  (e) => {
            e.preventDefault();
            return dispatch(thunkDeleteChannel(channelId))
            .then(() => setUpdate(true))
            .then(() => closeModal())
        };


    return (
        <div className='modal-login'>
        <h1>Delete {specificChannel[0].name}?</h1>
        <h5>You are about to delete {specificChannel[0].name}, are you sure?</h5>


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
}
export default DeleteChannelModal
