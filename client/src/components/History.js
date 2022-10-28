import React from "react";
import { AiFillDelete } from "react-icons/ai";

const History = ({ labels, deleteTransaction }) => {
  return (
    <div className="d-flex flex-column gap-3 pb-4">
      {labels.map((item, index) => (
        <div
          key={index}
          className="d-flex align-items-center justify-content-between w-100 bg-light rounded-end shadow"
        >
          <button className="btn p-0">
            <AiFillDelete
              onClick={() => deleteTransaction(item._id)}
              style={{ color: item.color, fontSize: "1.6rem" }}
            />
          </button>
          <span>{item.name}</span>
          <div
            className="rounded-end"
            style={{
              height: "45px",
              width: "10px",
              backgroundColor: item.color,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default History;
