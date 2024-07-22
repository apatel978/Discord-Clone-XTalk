import { useState} from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    const glass = await dispatch(thunkSignup({email, username, password}))


    if (glass.username) {
      errors.username = glass.username[0]
    }

    if (glass.email) {
      errors.email = glass.email[0]
    }


    if (password !== confirmPassword) {
      errors.password = "Passwords do not match";
    }

    if (!email.includes(`@`)){errors.email = 'Invalid email';}

    setErrors(errors)

    if (Object.values(errors).length) {
        return
    }

    if (!errors) {
      closeModal()
    }

  };
  const isDisabled = email.trim() === "" || username.trim().length < 4 || password.trim().length < 6 || confirmPassword.trim() === "" ;
  return (
    <div className='modal-signup'>
      <h1>Create an account</h1>
      <div id='top'>We are excited to see you! </div>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            placeholder="email@domain.com"
            className="input-field"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            className="input-field"
            placeholder="Display name"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            className="input-field"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            className="input-field"
            value={confirmPassword}
            placeholder="Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit" className="submit-btn" disabled={isDisabled}>Sign Up</button>
      </form>
      <div className="modal-container12">
      <div>Already have an account?  </div>
      <div className="modal-l"><OpenModalMenuItem
                itemText=" Log In"

                modalComponent={<LoginFormModal />}
              />
              </div>

      </div>
      <span className="sp sp-t"></span>
			<span className="sp sp-r"></span>
			<span className="sp sp-b"></span>
			<span className="sp sp-l"></span>
    </div>
  );
}

export default SignupFormModal;
