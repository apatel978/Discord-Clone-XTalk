import EmojiPicker from 'emoji-picker-react';
import { useSelector, useDispatch } from 'react-redux';
import { addReactionToAMessage } from '../../redux/reactions';

const EmojiModal = ({ message }) => {
    const dispatch = useDispatch();

    const handleEmojiClick = (emojiData, event) => {
        event.preventDefault();
        console.log('MESSAGE: ', message);
        console.log('DATA: ', emojiData);
        dispatch()
    }
    return (
        <div>
            <EmojiPicker onEmojiClick={handleEmojiClick}/>
        </div>
    )
}

export default EmojiModal
