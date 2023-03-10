import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth";
import WeightService from "../services/Weight";

import type { IWeight } from "../services/Utils";
import WeightChart from "../components/WeightChart";
import WeightTable from "../components/WeightTable";

function Weight() {
  const [weights, setWeights] = useState<IWeight[]>([]);
  const [weight, setWeight] = useState("");
  const [firstLoad, setfirstLoad] = useState(true);
  const [refreshWeight, setrefreshWeight] = useState(false);
  const [when, setWhen] = useState(new Date().toLocaleDateString("en-CA"));
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await WeightService.getWeights();
      setWeights(response.weights || []);
      setrefreshWeight(false);
      setfirstLoad(false);
    };

    if (firstLoad || refreshWeight) {
      fetchData().catch(console.error);
    }
  }, [userId, refreshWeight, firstLoad]);

  useEffect(() => {
    const keyEnter = (event: any) => {
      if (event.key === "Enter") {
        event.preventDefault();
        WeightService.addWeight(weight, when);
        setrefreshWeight(true);
      }
    };
    document.addEventListener("keydown", keyEnter);
    return () => {
      document.removeEventListener("keydown", keyEnter);
    };
  }, [userId, weight, when]);

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
                    onChange={(e) => {
                      e.preventDefault();
                      setWeight(e.target.value);
                    }}
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
                    onChange={(e) => {
                      e.preventDefault();
                      setWhen(e.target.value);
                    }}
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
                      setrefreshWeight(true);
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
            <div className="columns">
              <div className="column">
                <WeightChart weights={weights} />
              </div>
              <div className="column">
                <WeightTable weights={weights} />
              </div>
            </div>
          )) || <p>No history to visualize</p>}
        </div>
      </div>
    </div>
  );
}

export default Weight;
