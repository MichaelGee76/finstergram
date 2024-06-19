import { useState } from "react";
import "./UploadImgFilter.css";

const UploadImgFilter = ({ img, filter, setFilterValues }) => {
  //   const [filterValue, setFilterValue] = useState(
  //     () => {
  //       if (filter.property === "blur") {
  //         return 0.7;
  //       } else if (
  //         filter.property === "grayscale" ||
  //         filter.property === "sepia"
  //       ) {
  //         return 50;
  //       } else if (filter.property === "hue-rotate") {
  //         return 180;
  //       } else {
  //         return 100;
  //       }
  //     }
  // filter.property === "blur" ? 0.7 : 100
  //   );
  //   console.log(filter.property);
  //   console.log(filter.value);
  //   console.log(filter.unit);
  return (
    <div
      onClick={() =>
        setFilterValues({
          property: filter.property,
          value: filter.value,
          unit: filter.unit,
        })
      }
    >
      <img
        style={{
          filter: `${filter.property}(${filter.value}${filter.unit})`,
          WebkitFilter: `${filter.property}(${filter.value}${filter.unit})`,
        }}
        src={img}
        alt=""
      />
      <p>{filter.name}</p>
    </div>
  );
};

export default UploadImgFilter;
