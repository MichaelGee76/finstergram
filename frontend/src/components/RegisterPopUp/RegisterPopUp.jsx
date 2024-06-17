import "./RegisterPopUp.css";

const RegisterPopUp = ({ userdata }) => {
  const resendEmailHandler = (event) => {
    event.preventDefault();

    // const res = ky.pos
  };

  return (
    <section className="register_success_section">
      <h2>Welcome, {userdata.userName}!</h2>
      <p>
        We have sent you an email at {userdata.userName}. Please click on the
        link in the email to verify your account and be able to log in.
      </p>
      <button onClick={resendEmailHandler}>Send again</button>
    </section>
  );
};

export default RegisterPopUp;
