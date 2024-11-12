import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = ({
  size = 80,
  color = "#4fa94d",
  text = "Loading",
  textColor = "green",
  textStyle = {},
}) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <ClipLoader size={size} color={color} />
      <span
        style={{
          fontSize: "24px",
          color: textColor,
          fontWeight: "bold",
          letterSpacing: "1.5px",
          ...textStyle,
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default Loading;
