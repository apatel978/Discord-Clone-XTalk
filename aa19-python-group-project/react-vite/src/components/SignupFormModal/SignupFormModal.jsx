import { useState, useEffect } from "react";
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
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const { closeModal } = useModal();

  useEffect(() => {
    const errors = {};

    if (!email.includes(`@`)) errors.email = 'Invalid email';
    if (password !== confirmPassword) errors.matchPassword = 'Passwords do not match'
    setErrors(errors)

  }, [email, password, confirmPassword])

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (Object.values(errors).length) {
      return
    }

    if (Object.values(errors).length === 0) {
      return dispatch(thunkSignup({email, username, password}))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          console.log("DATA", data)
          if (!data) {
            setErrors(data.errors);
          }
        });
    }
    setErrors({});
    setHasSubmitted(false)
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
        {hasSubmitted === true && errors.email && <p>{errors.email}</p>}
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
        {hasSubmitted === true && errors.username && <p>{errors.username}</p>}
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
        {hasSubmitted===true && errors.matchPassword && <p>{errors.matchPassword}</p>}
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
