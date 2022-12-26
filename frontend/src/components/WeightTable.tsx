import { useEffect, useState } from "react";
import type { IWeight } from "../services/Utils";

interface IWeightTable {
  weights: IWeight[];
}

function WeightTable(props: IWeightTable): JSX.Element {
  const [weights, setWeight] = useState<IWeight[]>([]);
  const [rows, setRows] = useState<React.ReactNode>([]);

  useEffect(() => {
    setWeight(props.weights);

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
  }, [props.weights, weights]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default WeightTable;
