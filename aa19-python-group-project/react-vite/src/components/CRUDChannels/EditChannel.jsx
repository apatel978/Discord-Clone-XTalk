import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { thunkUpdateChannel } from '../../redux/channels';

const EditChannel = ({ channelId, setUpdate, serverChannels }) => {
    const dispatch = useDispatch();

    const { closeModal } = useModal()
    const sessionUser = useSelector(state => state.session.user)

    const [name, setName] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors ] = useState({});

    const specificChannel = []
    for (const channel of Object.values(serverChannels)) {
        if (channel.id === channelId) {
            specificChannel.push(channel)
        }
    }
    const updateName = (e) => setName(e.target.value)

    useEffect(() => {
        const errors = {};
        if (name.length < 1 || name.length > 100) errors.name = 'Channel name must be between 1 to 100 characters.'
        setErrors(errors)
      }, [name])


    if (sessionUser) { //checks if user is logged in

    const handleSubmit =  (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.values(errors).length) {
            return
        }

        const payload = {
            name: name,
            channel_id: channelId
        }

        return dispatch(thunkUpdateChannel(payload, channelId))
        .then(() => setHasSubmitted(false))
        .then(() => setName(""))
        .then(() => setUpdate(true))
        .then(() => closeModal())
    };

    return (
        <div className="modal-login">
            <form onSubmit={handleSubmit}>
                <h1>Edit Channel</h1>
                <div>
                    <div>Name</div>
                        <input
                            type="text"
                            className="input-field"
                            value={name}
                            placeholder={`${specificChannel[0].name}`}
                            onChange={updateName}
                        />
                         {hasSubmitted === true && errors.name && <div className="errors">{errors.name}</div>}
                </div>
                <button onClick={handleSubmit} className={`edit-channel-button`}type="submit">Edit Channel</button>
            </form>
        </div>
    )
    }
}

export default EditChannel
