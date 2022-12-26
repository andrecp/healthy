import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth";
import WeightService from "../services/Weight";

import type { IWeight } from "../services/Utils";

function Weight() {
  const [weights, setWeights] = useState<IWeight[]>([]);
  const [weight, setWeight] = useState("");
  const [when, setWhen] = useState(new Date().toLocaleDateString("en-CA"));
  const [rows, setRows] = useState<React.ReactNode>([]);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await WeightService.getWeights();
      setWeights(response.weights || []);
    };

    fetchData().catch(console.error);
  }, [userId]);

  useEffect(() => {
    const keyEnter = (event: any) => {
      if (event.key === "Enter") {
        event.preventDefault();
        WeightService.addWeight(weight, when);
      }
    };
    document.addEventListener("keydown", keyEnter);
    return () => {
      document.removeEventListener("keydown", keyEnter);
    };
  }, [userId, weight, when]);

  useEffect(() => {
    if (weights.length > 0) {
      const _rows = weights.map((singleWeight) => {
        return (
          <tr key={singleWeight.date_time}>
            <td>{singleWeight.date_time}</td>
            <td>{singleWeight.weight_kg}</td>
          </tr>
        );
      });
      setRows(_rows);
    }
  }, [weights]);

  return (
    <div className="section">
      <div className="container is-fluid">
        <h1 className="title">Weights</h1>
        <h2 className="subtitle">Enter your weight, check the trends</h2>

        <div className="box">
          <div className="field is-horizontal is-justify-content-start">
            <div className="field-body">
              <div className="field has-addons">
                <p className="control">
                  <input
                    className="input"
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Enter your weight"
                  />
                </p>
                <p className="control">
                  <button className="button is-static is-link">kg</button>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <input
                    className="input"
                    type="date"
                    value={when}
                    onChange={(e) => setWhen(e.target.value)}
                    placeholder="When did you weight yourself? Leave empty for now"
                  />
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button
                    className="button is-link is-pulled-right"
                    onClick={(e) => {
                      e.preventDefault();
                      WeightService.addWeight(weight, when);
                    }}
                  >
                    Add weight
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="box">
          {(weights.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          )) || <p>No history to visualize</p>}
        </div>
      </div>
    </div>
  );
}

export default Weight;
