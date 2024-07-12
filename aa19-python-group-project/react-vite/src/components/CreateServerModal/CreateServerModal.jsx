import "./CreateServerModal.css";
import { useDispatch,useSelector } from "react-redux";
import { useState, useRef} from "react";
import { useModal } from "../../context/Modal";
import { thunkCreateServer } from '../../redux/servers';
const CreateServerModal = () => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const username = useSelector((state)=> state.session.user.username);
    const [serverName, setServerName] = useState(`${username}'s Server`);
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    // const [imageUrl, setImageUrl] = useState(null); // State to store image URL

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(thunkCreateServer(serverName, file));
        // const formData = new FormData();
        // formData.append('serverName', serverName);

        // if (file) {
        //     formData.append('file', file);
        //     try {
        //         const uploadResponse = await fetch('/api/upload', {
        //             method: 'POST',
        //             body: formData
        //         });
        //         const uploadData = await uploadResponse.json();
        //         console.log(uploadData)
        //         if (uploadData.error) {
        //             console.error('Upload Error:', uploadData.error);
        //         } else {
        //             console.log('Upload Successful:', uploadData.message);
        //             setImageUrl(uploadData.imageUrl);
        //             console.log('line 35', imageUrl)
        //         }
        //         const serverData = {
        //             name: serverName,
        //             preview: uploadData.imageUrl
        //         };
        //         const serverResponse = await csurFetch('/api/servers', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify(serverData),
        //             credentials: 'include'
        //         });

        //         const serverDataResponse = await serverResponse.json();

        //         if (serverResponse.status === 200) {
        //             console.log('Server Created:', serverDataResponse);

        //         } else {
        //             console.error('Server Creation Error:', serverDataResponse.errors);
        //
        //         }
        //     } catch (error) {
        //         console.error('Error uploading file:', error);
        //     }
        // }else {
        //     console.log('No file uploaded');
        // }

          closeModal();
      };
      const handleImageClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    return (
        <div className='modal-login'>
        <h1>Create Your Server</h1>
        <h5>Give your Server a personality with a name and icon.</h5>
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
             placeholder="Server Name"
            onChange={(e) => setServerName(e.target.value)}
            required
          />
          </label>
          <div className="buttons-container">
        <button type="submit" className="submit-btn" >Create Server</button>
        </div>
          </form>
        <span className="sp sp-t"></span>
			<span className="sp sp-r"></span>
			<span className="sp sp-b"></span>
			<span className="sp sp-l"></span>

        </div>
    )
}

export default CreateServerModal
