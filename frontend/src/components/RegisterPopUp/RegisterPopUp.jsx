import "./RegisterPopUp.css";

const RegisterPopUp = ({ userData, setRegisterMessage, setToggle }) => {
  const resendEmailHandler = (event) => {
    event.preventDefault();

    // const res = ky.pos
  };

  const backToLogin = () => {
    setToggle(false);
    setRegisterMessage(false);
  };

  return (
    <section className="register_success_section">
      <h2>Welcome, {userData.userName}!</h2>
      <p>
        We have sent you an email at {userData.email}. Please click on the link
        in the email to verify your account and be able to log in.
      </p>
      <div>
        <p onClick={backToLogin} className="back_to_login">
          back to login
        </p>
        <button onClick={resendEmailHandler}>Send again</button>
      </div>
    </section>
  );
};

export default RegisterPopUp;
