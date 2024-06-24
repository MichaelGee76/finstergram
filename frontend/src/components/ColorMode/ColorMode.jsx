import { useState } from "react";

const ColorMode = () => {
  const [colorSelect, setColorSelect] = useState(0);

  if (colorSelect === "light") {
    document.documentElement.style.setProperty("--mid-pink", "#ff4d67");
    document.documentElement.style.setProperty("--light-pink", "#ff8a9b");
    document.documentElement.style.setProperty("--icons-grey", "#9e9e9e");
    document.documentElement.style.setProperty("--input-grey", "#fafafa");
    document.documentElement.style.setProperty("--loginfont-grey", "#9e9e9e");
    document.documentElement.style.setProperty("--hashtag-blue", "#3f51b2");
    document.documentElement.style.setProperty("--main-background", "#ffffff");
    document.documentElement.style.setProperty("--main-text", "#212121");
    document.documentElement.style.setProperty("--sec-text", "#616161");
  } else if (colorSelect === "dark") {
    document.documentElement.style.setProperty("--mid-pink", "#5046E5"); //check
    document.documentElement.style.setProperty("--light-pink", "#8186FF"); //check
    document.documentElement.style.setProperty("--icons-grey", "#D9D9D9"); //check
    document.documentElement.style.setProperty("--input-grey", "#1B2730"); //check
    document.documentElement.style.setProperty("--loginfont-grey", "#1B2730"); //check
    document.documentElement.style.setProperty("--hashtag-blue", "#03A9F4"); //check
    document.documentElement.style.setProperty("--main-background", "#06141D"); //check
    document.documentElement.style.setProperty("--main-text", "#D9D9D9"); //check
    document.documentElement.style.setProperty("--sec-text", "#D9D9D9"); //check
  }

  console.log(colorSelect);

  return (
    <div>
      <button onClick={() => setColorSelect("dark")}>darkmode</button>
      <button onClick={() => setColorSelect("light")}>lightmode</button>
      {/* <button>custom</button> */}
    </div>
  );
};

export default ColorMode;
