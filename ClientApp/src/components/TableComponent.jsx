import React from "react";
import '../styles/tableStyles.css'
function TableComponent({ data, columns,actions,extraCol="" }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((head) => (
            <th>{head}</th>
          ))}
          <th>{extraCol}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr>
            {columns.map((col) => (
              <td>{row[col]}</td>
            ))}
            <td>{actions(row)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableComponent;
