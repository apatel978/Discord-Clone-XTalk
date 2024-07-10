import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditServerModal from "../CreateServerModal/EditServerModal";
import LeaveServerModal from "./LeaveServerModal"
import DeleteServerModal from "./DeleteServerModal";
import { FaCaretDown } from 'react-icons/fa';

function ServerInfo({serverId}) {

  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const server = useSelector((store)=>store.servers[serverId])

  const owner = user?.id === server?.ownerId
  
 
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); 
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  if (!server) {
    return <div>Loading...</div>; 
  }
  return (
    <>
        <div >
          <button className="server-info" onClick={toggleMenu}>
            {server.name} <FaCaretDown />
          </button>
          {showMenu && (
            <div className={"profile-dropdown"} ref={ulRef}>
                <>
                {owner ?  ( 
                <>
                    <OpenModalMenuItem
                    itemText="Edit Server"
                    onItemClick={closeMenu}
                    modalComponent={<EditServerModal serverId={serverId} />}
                    />
                    <OpenModalMenuItem
                    itemText="Delete Server"
                    onItemClick={closeMenu}
                    modalComponent={<DeleteServerModal serverId={serverId}/>}
                    />
                </>):( 
                    <OpenModalMenuItem
                    itemText="Leave Server"
                    onItemClick={closeMenu}
                    modalComponent={<LeaveServerModal serverId={serverId}/>}
                    />)}
                </>
            </div>
          )}
        </div>
      
    </>
  );
}

export default ServerInfo;
