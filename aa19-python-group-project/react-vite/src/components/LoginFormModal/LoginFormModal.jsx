import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    return dispatch(thunkLogin({email, password}))
    .then(closeModal)
    .catch(async (res) => {
        const data = await res.json();
        if (data) {
          setErrors({email: data.email, password: data.password});
        }
      })
    ;


  };

  const isSubmitDisabled = email.length < 4 || password.length < 6;
  const handleDemoUserLogin = async () => {
    setEmail('demo@aa.io');
    setPassword('password');
    try {
      // Attempt to log in with demo user credentials
      await dispatch(thunkLogin.login({ credential: 'demo@aa.io', password: 'password' }));
      closeModal();
    } catch (error) {
      if (error.status === 401)
        setErrors({ invalidCredentials: 'The provided credentials were invalid' });
    }
  };
  return (

    <div className='modal-login'>
      <h1>Welcome Back!</h1>
      <h5>We are excited to see you again!</h5>
      <form onSubmit={handleSubmit}>
        <label>
          <div>Email</div>
          <input
            type="text"
            value={email}
            className="input-field"
            placeholder="email@domain.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            className="input-field"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <div className="buttons-container">
        <button type="submit" className="submit-btn" disabled={isSubmitDisabled}>Log In</button>
        <button onClick={handleDemoUserLogin} className="submit-btn">Demo User</button>
        </div>
      </form>
      <span className="sp sp-t"></span>
			<span className="sp sp-r"></span>
			<span className="sp sp-b"></span>
			<span className="sp sp-l"></span>
      </div>
  );
}

export default LoginFormModal;
