import { useState } from "react";
import "./SignInUp.css";
import {
  TokenDataContext,
  UserDataContext,
} from "../../components/context/Context";
import { useContext } from "react";
import { Link } from "react-router-dom";

const SignInUp = () => {
  const [toggle, setToggle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser } = useContext(UserDataContext);
  const { token, setToken } = useContext(TokenDataContext);

  return (
    <main className="sign_section">
      <h1>{toggle ? "Create " : "Login to "}your account</h1>
      <img src="./img/LogoBig.svg" alt="" />
      <form action="">
        <div>
          <label htmlFor="email">
            <img src="./img/Message.svg" alt="" />
          </label>
          <input type="email" name="" id="email" />
        </div>
        <div>
          <label htmlFor="password">
            <img src="./img/PasswordLock.svg" alt="" />
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name=""
            id="password"
          />
          <img
            onClick={() => setShowPassword((showPassword) => !showPassword)}
            src={
              showPassword ? "./img/HidePassword.svg" : "./img/ShowPassword.svg"
            }
            alt=""
          />
        </div>
        {toggle ? <button>Sign up</button> : <button>Sign in</button>}
      </form>
      {toggle ? (
        <p>
          Already have an account?
          <Link onClick={() => setToggle((toggle) => !toggle)}>Sign in</Link>
        </p>
      ) : (
        <p>
          Dont have an account?
          <Link onClick={() => setToggle((toggle) => !toggle)}>Sign up</Link>
        </p>
      )}
    </main>
  );
};

export default SignInUp;
