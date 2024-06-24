import { useEffect, useState } from "react";
import "./Loading.css";

const Loading = () => {
    const [showLogo, setShowLogo] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLogo(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="loading_section">
            <div>
                {showLogo ? (
                    <>
                        <img
                            className="logo_back"
                            src="/img/LogoBackground.svg"
                            alt="backgrouund logo"
                        />
                        <img
                            className="logo_inner"
                            src="/img/LogoInner.svg"
                            alt="inner logo"
                        />

                        <dotlottie-player
                            className="lottie"
                            src="https://lottie.host/eb79bc1d-9339-49a1-8f43-c73f0a957884/vkKMKohhMn.json"
                            background="transparent"
                            speed="0.5"
                            style={{ width: "120%" }}
                            loop
                            autoplay
                        ></dotlottie-player>
                    </>
                ) : (
                    <h1>Welcome To Finstagram</h1>
                )}
            </div>
        </section>
    );
};
export default Loading;
