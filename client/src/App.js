import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Graph from "./components/Graph";

function App() {
  const [labels, setLabels] = useState([]);
  const [total, setTotal] = useState(0);
  const [globalPercent, setGlobalPercent] = useState([]);

  useEffect(() => {
    getLabels();
  }, []);

  const getLabels = async () => {
    await axios
      .get("https://expense-tracker-api-18qm.onrender.com/api/labels")
      .then(res => setLabels(res.data))
      .catch(error => console.log(error))
      .finally(() => getPercent());
  };

  const deleteTransaction = async id => {
    await axios
      .delete(`https://expense-tracker-api-18qm.onrender.com/api/transactions`, {
        data: {
          _id: id,
        },
      })
      .then(() => getLabels())
      .catch(error => console.log(error));
  };

  const getPercent = async () => {
    const data = await axios.get("https://expense-tracker-api-18qm.onrender.com/api/labels");
    const newLabels = data.data;

    const totalExpend = newLabels.reduce((pre, cur) => pre + cur["amount"], 0);
    setTotal(totalExpend);

    const invLabels = newLabels.filter(v => v.type === "Investment");
    const expLabels = newLabels.filter(v => v.type === "Expense");
    const savLabels = newLabels.filter(v => v.type === "Savings");

    const invExpend = invLabels.reduce((pre, cur) => pre + cur["amount"], 0);
    const expExpend = expLabels.reduce((pre, cur) => pre + cur["amount"], 0);
    const savExpend = savLabels.reduce((pre, cur) => pre + cur["amount"], 0);

    const invPercent = Math.round((invExpend * 100) / totalExpend);
    const expPercent = Math.round((expExpend * 100) / totalExpend);
    const savPercent = Math.round((savExpend * 100) / totalExpend);

    setGlobalPercent([
      {
        type: invLabels.length > 0 ? invLabels[0].type : "",
        color: invLabels.length > 0 ? invLabels[0].color : "",
        percent: invPercent,
      },
      {
        type: expLabels.length > 0 ? expLabels[0].type : "",
        color: expLabels.length > 0 ? expLabels[0].color : "",
        percent: expPercent,
      },
      {
        type: savLabels.length > 0 ? savLabels[0].type : "",
        color: savLabels.length > 0 ? savLabels[0].color : "",
        percent: savPercent,
      },
    ]);

    console.log(globalPercent);
  };

  return (
    <div className="container pt-5">
      <h1 className="text-center bg-dark bg-gradient text-white py-3 display-5 fw-semibold ">
        Expense Tracker
      </h1>
      <div className="row pt-3 g-5">
        <div className="col-md-6">
          <Graph total={total} globalPercent={globalPercent} />
        </div>
        <div className="col-md-6">
          <Form
            labels={labels}
            getLabels={getLabels}
            deleteTransaction={deleteTransaction}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
