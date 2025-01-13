import React from "react";
import UI from "@gh/ui";

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
    <UI.Col
      style={{
        overflow: "auto",
        height: 400,
        position: "relative",
        width: "100%",
      }}
    >
      <UI.Row
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 9,
          bgcolor: "white",
        }}
      >
        <UI.Row
          sx={{
            position: "sticky",
            top: 0,
            left: 0,
            zIndex: 9,
            bgcolor: "white",
          }}
        >
          <UI.Col
            style={{
              position: "sticky",
              // left: 0,
              // top: 0,
              minWidth: 100,
              ...styles.border,
              paddingLeft: 8,
              paddingBottom: 8,
            }}
            justifyContent="flex-end"
          >
            Detail
          </UI.Col>
          <UI.Col
            style={{
              position: "sticky",
              // top: 0,
              // left: 100,
              minWidth: 100,
              ...styles.border,
              paddingBottom: 8,
              paddingLeft: 8,
            }}
            justifyContent="flex-end"
          >
            Detail2xx
          </UI.Col>
          <UI.Col
            style={{
              position: "sticky",
              // top: 0,
              // left: 200,
              minWidth: 100,
              ...styles.border,
              paddingBottom: 8,
              paddingLeft: 8,
            }}
            justifyContent="flex-end"
          >
            Detail3
          </UI.Col>
        </UI.Row>

        {months.map((month, mix) => (
          <UI.Col
            key={month}
            sx={{
              zIndex: 8,
              bgcolor: "white",
            }}
          >
            <UI.Text textAlign="center" sx={styles.border}>
              {month}
            </UI.Text>
            <UI.Row className="week-header" flex={1} justifyContent="space-between">
              {Array.from({ length: weeksPerMonth }, (_, weekIndex) => (
                <UI.Col
                  key={`M${mix}-W${weekIndex + 1}`}
                  flex={1}
                  sx={{
                    ...styles.border,
                    width: config.cellWidth,
                  }}
                >
                  <UI.Text variant="body1" textAlign="center">
                    W{weekIndex + 1}
                  </UI.Text>
                </UI.Col>
              ))}
            </UI.Row>
          </UI.Col>
        ))}
      </UI.Row>

      {items.map((item, rowIndex) => (
        <UI.Row
          key={`row-${rowIndex}`}
          sx={{
            bgcolor: rowIndex % 2 == 0 ? config.rowEvenColor : config.rowOddColor,
          }}
        >
          <UI.Col
            className="detail-column"
            style={{
              position: "sticky",
              left: 0,
              minWidth: 100,
              ...styles.border,
              paddingLeft: 8,
              justifyContent: "center",
            }}
          >
            {item}
          </UI.Col>
          <UI.Col
            className="detail-column"
            style={{
              position: "sticky",
              left: 100,
              minWidth: 100,
              ...styles.border,
              paddingLeft: 8,
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            D2{item}
          </UI.Col>
          <UI.Col
            className="detail-column"
            style={{
              position: "sticky",
              left: 200,
              minWidth: 100,
              ...styles.border,
              paddingLeft: 8,

              justifyContent: "center",
              zIndex: 1,
            }}
          >
            D3{item}
          </UI.Col>
          {months.flatMap((_, monthIndex) =>
            Array.from({ length: weeksPerMonth }, (_, weekIndex) => (
              <UI.Col key={`M${monthIndex}-R${rowIndex}-W${weekIndex + 1}`}>
                <UI.Text
                  variant="body1"
                  sx={{
                    ...styles.border,
                    width: config.cellWidth,
                  }}
                >
                  {weekIndex}-{Math.floor(Math.random() * 10)} {/* Example data */}
                </UI.Text>
              </UI.Col>
            ))
          )}
        </UI.Row>
      ))}
    </UI.Col>
  );
};

export default Table;
