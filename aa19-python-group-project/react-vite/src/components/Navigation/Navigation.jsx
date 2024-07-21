import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from 'react-redux';
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  return (
<div className='header'>
<div className="logo-navbar">
  <NavLink to="/" >
     <img className='logo' src='https://crosstalkappbuck.s3.us-east-2.amazonaws.com/logo.png' alt="CrossTalkLogo" />
  </NavLink>
</div>
 
  <div className='profile'>
    <ProfileButton user={sessionUser} />
  </div>

</div>
  );
}

export default Navigation;
