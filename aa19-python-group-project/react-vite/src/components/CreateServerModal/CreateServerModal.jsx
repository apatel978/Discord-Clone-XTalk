import "./CreateServerModal.css";
import { useDispatch,useSelector } from "react-redux";
import { useState, useRef} from "react";
import { useModal } from "../../context/Modal";
const CreateServerModal = () => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const username = useSelector((state)=> state.session.user.username);
    const [serverName, setServerName] = useState(`${username}'s Server`);
    const fileInputRef = useRef(null); 
    const handleSubmit = async (e) => {
        e.preventDefault();
    
          closeModal();
      };
      const handleImageClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // Handle the file upload logic here
        console.log(file); // For now, just log the selected file
    };

    return (
        <div className='modal-login'>
        <h1>Create Your Server</h1>
        <h5>Give your Server a personality with a name an icon.</h5>
        <img 
            src='../../../images/upload.png'
            alt="Upload Icon" 
            onClick={handleImageClick} 
            className='Cs'>
        </img>
        <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleFileChange} 
        />
<form onSubmit={handleSubmit}>
        <label>
          <div>Server Name</div>
          <input
            type="text"
            value={serverName}
            className="input-field"
            
            onChange={(e) => setServerName(e.target.value)}
            required
          />
          </label>
          </form>
          <div className="buttons-container">
        <button type="submit" className="submit-btn" >Create Server</button>
        </div>
        <span className="sp sp-t"></span>
			<span className="sp sp-r"></span>
			<span className="sp sp-b"></span>
			<span className="sp sp-l"></span>
        
        </div>
    )
}

export default CreateServerModal
