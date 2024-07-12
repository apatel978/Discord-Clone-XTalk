import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { thunkCreateChannel } from '../../redux/channels';
import { useNavigate } from 'react-router-dom';

const CreateChannel = ({ serverId, setUpdate }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { closeModal } = useModal()
    const sessionUser = useSelector(state => state.session.user)

    const [name, setName] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors ] = useState({});

    const updateName = (e) => setName(e.target.value)

    useEffect(() => {
        const errors = {};
        if (name.length < 1 || name.length > 100) errors.name = 'Channel name must be between 1 to 100 characters.'
        setErrors(errors)
      }, [name])


    if (sessionUser) { //if user is logged in, they can make a channel

    const handleSubmit =  (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.values(errors).length) {
            return
        }

        const payload = {
            name: name,
            server_id: serverId
        }

        return dispatch(thunkCreateChannel(payload, serverId))
        .then(() => setHasSubmitted(false))
        .then(() => setName(""))
        .then(() => setUpdate(true))
        .then(() => closeModal())
    };

    return (
        <div className="modal-login">
            <form onSubmit={handleSubmit}>
                <h1>Create a Channel</h1>
                <div>
                    <div>Name</div>
                        <input
                            type="text"
                            className="input-field"
                            value={name}
                            onChange={updateName}
                        />
                         {hasSubmitted === true && errors.name && <div className="errors">{errors.name}</div>}
                </div>
                <button onClick={handleSubmit} className={`create-channel-button`}type="submit">Create Channel</button>
            </form>
        </div>
    )
    }
}

export default CreateChannel
