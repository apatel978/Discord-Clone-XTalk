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

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
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
          <div>Email or Username</div>
          <input
            type="text"
            value={email}
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
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <div className="buttons-container">
        <button type="submit" className="demo-user-button" disabled={isSubmitDisabled}>Log In</button>
        <button onClick={handleDemoUserLogin} className="demo-user-button">Demo User</button>
        </div>
      </form>
      </div>
  );
}

export default LoginFormModal;
