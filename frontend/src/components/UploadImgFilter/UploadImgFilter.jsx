import { useState } from "react";
import "./UploadImgFilter.css";

const UploadImgFilter = ({ img, filter, setFilterValues }) => {

  return (
    <div
      onClick={() =>
        setFilterValues({
          property: filter.property,
          value: filter.value,
          unit: filter.unit,
          range: {
            min: filter.range.min,
            max: filter.range.max,
          },
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
