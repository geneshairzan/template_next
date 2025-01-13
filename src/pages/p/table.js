import React from "react";
import UI from "@gh/ui";
import h from "@gh/helper";

const weeksPerMonth = 4;

// const items = ["Item 1", "Item 2", "Item 3", "Item 4"]; // Example data
let items = Array(100)
  .fill()
  .map((d, ix) => `item ${ix}`);
const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString("default", { month: "short" }));

let config = {
  cellWidth: 60,
  rowEvenColor: "#f9f9f9",
  rowOddColor: "white",
};

let styles = {
  border: {
    border: "1px solid lightGrey",
    borderLeft: "none",
    borderTop: "none",
    p: 1,
  },
};

const Table = () => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr className="month-header">
            <th
              className="detail-column"
              rowSpan="2"
              style={{
                zIndex: 9,
              }}
            >
              Detail 1
            </th>
            <th
              className="detail-column"
              rowSpan="2"
              style={{
                zIndex: 9,
              }}
            >
              Detail 2
            </th>
            <th
              className="detail-column"
              rowSpan="2"
              style={{
                zIndex: 9,
              }}
            >
              Detail 3
            </th>
            {months.map((month) => (
              <th key={month} colSpan={weeksPerMonth} className="month-cell">
                {month}
              </th>
            ))}
          </tr>
          <tr className="week-header">
            {months.flatMap((_, monthIndex) =>
              Array.from({ length: weeksPerMonth }, (_, weekIndex) => (
                <th key={`M${monthIndex}-W${weekIndex + 1}`}>W{weekIndex + 1}</th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((item, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              <td className="detail-column">{item}</td>
              <td className="detail-column">{item}</td>
              <td className="detail-column">{item}</td>
              {months.flatMap((_, monthIndex) =>
                Array.from({ length: weeksPerMonth }, (_, weekIndex) => (
                  <td key={`M${monthIndex}-R${rowIndex}-W${weekIndex + 1}`} style={{ width: 200 }}>
                    {h.curr.format(Math.random() * 10000000, "")} {/* Example data */}
                  </td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
