import { useState } from "react";
import "./SignInUp.css";
import {
  TokenDataContext,
  UserDataContext,
} from "../../components/context/Context";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../../api/api";
import RegisterPopUp from "../../components/RegisterPopUp/RegisterPopUp";
import ky from "ky";

const SignInUp = () => {
  const [toggle, setToggle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registerMessage, setRegisterMessage] = useState();
  const { setUser } = useContext(UserDataContext);
  const { setToken } = useContext(TokenDataContext);
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    const res = await ky
      .post(`${backendUrl}/users/login`, {
        json: { email: registerData.email, password: registerData.password },
        credentials: "include",
      })
      .json();

    setUser(res.result.userData);
    // console.log(res.result.userData);
    setToken(res.result.tokens.accessToken);

    navigate("/");

    // save token --> "logged in"
  };

  const registerHandler = async (event) => {
    event.preventDefault();

    const res = await ky
      .post(`${backendUrl}/users/register`, {
        json: registerData,
      })

      .json();
    console.log(res.result);
    setRegisterMessage(res.result);
    setRegisterData({
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
    });

    // if (!data.result)
    //   return setErrorMessage(
    //     data.message || "Failed to register, please try again."
    //   );
  };

  // console.log(registerData);

  return (
    <main className="sign_section">
      {registerMessage && <RegisterPopUp userData={registerMessage} />}
      <h1>{toggle ? "Create " : "Login to "}your account</h1>
      <img src="./img/LogoBig.svg" alt="" />
      <form action="">
        {toggle && (
          <div>
            <label htmlFor="firstname">
              {/* <img src="./img/PasswordLock.svg" alt="" /> */}
            </label>
            <input
              type="text"
              name=""
              id="firstname"
              placeholder="Firstname"
              value={registerData.firstName}
              onChange={(event) =>
                setRegisterData({
                  ...registerData,
                  firstName: event.target.value,
                })
              }
            />
          </div>
        )}
        {toggle && (
          <div>
            <label htmlFor="lastname">
              {/* <img src="./img/PasswordLock.svg" alt="" /> */}
            </label>
            <input
              type="text"
              name=""
              id="lastname"
              placeholder="Lastname"
              value={registerData.lastName}
              onChange={(event) =>
                setRegisterData({
                  ...registerData,
                  lastName: event.target.value,
                })
              }
            />
          </div>
        )}
        {toggle && (
          <div>
            <label htmlFor="username">
              {/* <img src="./img/PasswordLock.svg" alt="" /> */}
            </label>
            <input
              type="text"
              name=""
              id="username"
              placeholder="Username"
              value={registerData.userName}
              onChange={(event) =>
                setRegisterData({
                  ...registerData,
                  userName: event.target.value,
                })
              }
            />
          </div>
        )}

        <div>
          <label htmlFor="email">
            <img src="./img/Message.svg" alt="" />
          </label>
          <input
            type="email"
            name=""
            id="email"
            placeholder="Email"
            value={registerData.email}
            onChange={(event) =>
              setRegisterData({
                ...registerData,
                email: event.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="password">
            <img src="./img/PasswordLock.svg" alt="" />
          </label>
          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            name=""
            id="password"
            value={registerData.password}
            onChange={(event) =>
              setRegisterData({
                ...registerData,
                password: event.target.value,
              })
            }
          />
          <img
            onClick={() => setShowPassword((showPassword) => !showPassword)}
            src={
              showPassword ? "./img/HidePassword.svg" : "./img/ShowPassword.svg"
            }
            alt=""
          />
        </div>

        {toggle ? (
          <button onClick={registerHandler}>Sign up</button>
        ) : (
          <button onClick={loginHandler}>Sign in</button>
        )}
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
