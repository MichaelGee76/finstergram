import "./RegisterPopUp.css";

const RegisterPopUp = ({ userData }) => {
  const resendEmailHandler = (event) => {
    event.preventDefault();

    console.log(userData);

    // const res = ky.pos
  };

  return (
    <section className="register_success_section">
      <h2>Welcome, {userData.userName}!</h2>
      <p>
        We have sent you an email at {userData.userName}. Please click on the
        link in the email to verify your account and be able to log in.
      </p>
      <button onClick={resendEmailHandler}>Send again</button>
    </section>
  );
};

export default RegisterPopUp;
