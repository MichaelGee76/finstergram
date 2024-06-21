import "./Loading.css";

const Loading = () => {
  return (
    <section className="loading_section">
      <img src="/img/LogoBig.svg" alt="logo" />

      <dotlottie-player
        className="lottie"
        src="https://lottie.host/eb79bc1d-9339-49a1-8f43-c73f0a957884/vkKMKohhMn.json"
        background="transparent"
        speed="0.5"
        style={{ width: "140%" }}
        loop
        autoplay
      ></dotlottie-player>
    </section>
  );
};
export default Loading;
