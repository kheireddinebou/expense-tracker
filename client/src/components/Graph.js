import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { Labels } from "./Labels";
Chart.register(ArcElement);

const Graph = ({total, globalPercent}) => {
  const percent = globalPercent.map(v => v.percent);
  const colors = globalPercent.map(v => v.color);

  const config = {
    data: {
      datasets: [
        {
          label: "My First Dataset",
          data: percent ,
          backgroundColor: colors,
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 115,
    },
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="position-relative mb-3 chart">
        <Doughnut {...config} />
        <h3 className="fw-bolder title">
          Total{" "}
          <span style={{ color: "#1DBF73" }} className="d-block text-center">
            ${total}
          </span>
        </h3>
      </div>
      <Labels globalPercent={globalPercent} />
    </div>
  );
};

export default Graph;
