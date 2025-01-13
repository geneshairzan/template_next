import React from "react";

const weeksPerMonth = 4;

const items = Array(100)
  .fill()
  .map((_, ix) => `Item ${ix}`);

const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString("default", { month: "short" }));

const Table = () => {
  return (
    <div className="table-container">
      <table>
        <>
          <tr className="month-header">
            <td
              rowSpan="2"
              className="detail-column"
              style={{
                position: "sticky",
                top: 0,
                zIndex: 99,
                backgroundColor: "green",
              }}
            >
              Detail
            </td>
            {months.map((month) => (
              <th
                key={month}
                colSpan={weeksPerMonth}
                className="month-cell"
                style={
                  {
                    // backgroundColor: "red",
                    // borderBottomWidth: 4,
                    // paddingBottom: 8,
                  }
                }
              >
                {month}
              </th>
            ))}
          </tr>
          <tr className="week-header">
            {months.flatMap((_, monthIndex) =>
              Array.from({ length: weeksPerMonth }, (_, weekIndex) => (
                <th
                  style={{
                    zIndex: 2,
                    // minWidth: 64,
                    // top: -32,
                    position: "sticky",
                    // padding/Top: -32,
                    // backgroundColor: "lightblue",
                  }}
                  key={`M${monthIndex}-W${weekIndex + 1}`}
                >
                  W{weekIndex + 1}
                </th>
              ))
            )}
          </tr>
        </>
        <tbody>
          {items.map((item, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              <td className="detail-column">{item}</td>
              {months.flatMap((_, monthIndex) =>
                Array.from({ length: weeksPerMonth }, (_, weekIndex) => (
                  <td key={`M${monthIndex}-R${rowIndex}-W${weekIndex + 1}`}>
                    {item}-{Math.floor(Math.random() * 10)} {/* Example data */}
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
