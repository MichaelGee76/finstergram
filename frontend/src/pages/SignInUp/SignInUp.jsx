import { useState } from "react";
import "./SignInUp.css";
import {
  ColorModeContext,
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
  const [errorMessage, setErrorMessage] = useState();
  const { setUser } = useContext(UserDataContext);
  const { setToken } = useContext(TokenDataContext);
  const { colorSelect, setColorSelect } = useContext(ColorModeContext);
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
        json: {
          email: registerData.email,
          password: registerData.password,
        },
        credentials: "include",
      })
      .json();

    setUser(res.result.user);

    setColorSelect(res.result.user.dark);
    setToken(res.result.tokens.accessToken);

    navigate("/");

    e.preventDefault();

    // save token --> "logged in"
  };

  console.log(registerMessage);

  const registerHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await ky
        .post(`${backendUrl}/users/register`, {
          headers: { "Content-Type": "application/json" },
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
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage(error);
    }
  };

  // console.log(registerData);

  return (
    <main className="sign_section">
      {registerMessage ? (
        "message" in registerMessage ? (
          ""
        ) : (
          <RegisterPopUp userData={registerMessage} />
        )
      ) : (
        ""
      )}
      <h1>{toggle ? "Create " : "Login to "}your account</h1>
      <svg
        width="140"
        height="141"
        viewBox="0 0 140 141"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1_2161)">
          <rect
            y="0.666748"
            width="140"
            height="140"
            rx="48"
            fill="url(#paint0_linear_1_2161)"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M65.71 28.88C47.419 30.7224 32.1499 44.6999 28.6205 62.8319C27.7997 67.048 27.7923 74.1958 28.6039 78.362C32.773 99.7588 52.6613 114.678 74.0401 112.446C80.2818 111.794 86.2879 109.859 91.3406 106.871C101.675 100.76 109.084 90.2275 111.396 78.362C112.208 74.1958 112.2 67.048 111.38 62.8319C107.22 41.4652 87.3586 26.6995 65.71 28.88ZM74.4828 50.157C80.2542 51.3486 86.281 56.1044 88.8323 61.4806C90.3912 64.7652 90.9446 67.2023 90.9372 70.7507C90.9174 80.3791 84.5332 88.5441 75.1144 90.9874C72.0138 91.7917 66.2637 91.584 63.3398 90.562C53.2025 87.0187 47.2896 76.6277 49.4603 66.1704C50.9733 58.8812 57.635 52.0507 64.9561 50.2816C67.3858 49.6943 71.9528 49.6349 74.4828 50.157ZM66.0775 58.7101C60.9248 60.3172 57.5078 65.0741 57.5078 70.6411C57.5078 74.3079 58.577 76.8959 61.1526 79.4646C63.7282 82.0332 66.3233 83.0995 70 83.0995C73.6767 83.0995 76.2718 82.0332 78.8474 79.4646C81.4072 76.9117 82.4947 74.2984 82.4866 70.7188C82.4797 67.6445 82.1141 66.9293 81.2341 68.2682C80.478 69.4191 78.0001 70.6217 76.3618 70.6331C73.0271 70.6561 70 67.6694 70 64.3563C70 62.8059 71.322 60.1281 72.4521 59.3898C73.1326 58.9453 73.2336 58.7288 72.8695 58.4983C72.1376 58.0355 67.808 58.1707 66.0775 58.7101Z"
            fill="white"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_1_2161"
            x1="140"
            y1="140.667"
            x2="-26.5874"
            y2="92.3663"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--mid-pink)" />
            <stop offset="1" stopColor="var(--light-pink)" />
          </linearGradient>
          <clipPath id="clip0_1_2161">
            <rect
              width="140"
              height="140"
              fill="white"
              transform="translate(0 0.666748)"
            />
          </clipPath>
        </defs>
      </svg>

      <p className="register_error">
        {registerMessage &&
          "message" in registerMessage &&
          registerMessage.message}
      </p>
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
          <Link
            onClick={() => {
              setToggle((toggle) => !toggle);
              setRegisterMessage("");
            }}
          >
            Sign in
          </Link>
        </p>
      ) : (
        <p>
          Dont have an account?
          <Link
            onClick={() => {
              setToggle((toggle) => !toggle);
              setRegisterMessage("");
            }}
          >
            Sign up
          </Link>
        </p>
      )}
    </main>
  );
};

export default SignInUp;
