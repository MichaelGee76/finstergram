import ky from "ky";
import {
    ColorModeContext,
    TokenDataContext,
    UserDataContext,
} from "../context/Context";
import "./ColorMode.css";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../api/api";

const ColorMode = () => {
    const { user } = useContext(UserDataContext);
    const { token } = useContext(TokenDataContext);
    const { colorSelect, setColorSelect } = useContext(ColorModeContext);

    const toggleDarkMode = async (event, selected) => {
        event.preventDefault();
        if (selected === colorSelect) return;
        const res = await ky
            .patch(`${backendUrl}/users/darkmode/${selected}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .json();

        setColorSelect(res.result.dark);
    };

    return (
        <div className="colormode_wrapper">
            <svg
                style={{ cursor: "pointer" }}
                onHove
                width="27px"
                height="27px"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <title>ic_fluent_dark_theme_24_regular</title>
                <desc>Created with Sketch.</desc>
                <g
                    id="🔍-Product-Icons"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                >
                    <g
                        id="ic_fluent_dark_theme_24_regular"
                        fillRule="nonzero"
                        fill="var(--main-text)"
                    >
                        <path
                            d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20.5 L12,3.5 C16.6944204,3.5 20.5,7.30557963 20.5,12 C20.5,16.6944204 16.6944204,20.5 12,20.5 Z"
                            id="🎨-Color"
                        ></path>
                    </g>
                </g>
            </svg>
            <button
                className={colorSelect ? "colormode_pressed" : ""}
                onClick={(event) => toggleDarkMode(event, true)}
            >
                Dark
            </button>
            <button
                className={!colorSelect ? "colormode_pressed" : ""}
                onClick={(event) => toggleDarkMode(event, false)}
            >
                Light
            </button>
            {/* <button>custom</button> */}
        </div>
    );
};

export default ColorMode;
