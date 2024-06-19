import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "./CustomDatePicker.css";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ selected, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="date-picker-button" onClick={onClick} ref={ref}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.2915 10.6463C2.2915 4.84964 4.224 2.91797 10.0198 2.91797C15.8165 2.91797 17.749 4.84964 17.749 10.6463C17.749 16.443 15.8165 18.3746 10.0198 18.3746C4.224 18.3746 2.2915 16.443 2.2915 10.6463Z"
          stroke="#212121"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.521 7.77018H17.5277"
          stroke="#212121"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.6904 11.0509H13.6979"
          stroke="#212121"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.0242 11.0509H10.0317"
          stroke="#212121"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.35116 11.0509H6.35866"
          stroke="#212121"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.6904 14.2609H13.6979"
          stroke="#212121"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.0242 14.2609H10.0317"
          stroke="#212121"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.35116 14.2609H6.35866"
          stroke="#212121"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.3608 1.7085V4.42683"
          stroke="#212121"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.68724 1.7085V4.42683"
          stroke="#212121"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  ));

  return (
    <DatePicker
      // selected={selected}
      onChange={handleDateChange}
      dateFormat="dd/MM/yyyy"
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      withPortal
      customInput={<CustomInput />}
    />
  );
};

export default CustomDatePicker;
