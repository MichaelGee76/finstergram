import "./UploadImgFilter.css";

const UploadImgFilter = ({ img, filter }) => {
  return (
    <div>
      <img src={img} alt="" />
      <p>{filter}</p>
    </div>
  );
};

export default UploadImgFilter;
