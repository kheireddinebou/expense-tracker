import React from "react";

export const Labels = ({ globalPercent }) => {
  return (
    <div
      style={{ maxWidth: "400px" }}
      className="d-flex flex-column mt-3 gap-3 w-100"
    >
      {globalPercent.map((item, index) => (
        <Label item={item} key={index} />
      ))}
    </div>
  );
};

const Label = ({ item }) => {
  const { type, color, percent } = item;

  if (percent > 0) {
    return (
      <div className="d-flex align-items-center justify-content-between w-100">
        <div className="d-flex gap-2">
          <div
            style={{
              height: "25px",
              width: "10px",
              borderRadius: "10px",
              backgroundColor: color,
            }}
          ></div>
          <span className="">{type}</span>
        </div>
        <span>{percent}%</span>
      </div>
    );
  }
};
