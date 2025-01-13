import React from "react";
import UI from "@gh/ui";
import h from "@gh/helper";

const weeksPerMonth = 4;

let items = Array(100)
  .fill()
  .map((d, ix) => `item ${ix}`);
const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString("default", { month: "short" }));

let config = {
  cellWidth: 90,
  rowEvenColor: "#f9f9f9",
  rowOddColor: "white",
  rowHeight: 36,
};

let styles = {
  frezed: {},
  border: {
    border: "1px solid lightGrey",
    borderLeft: "none",
    borderTop: "none",
    p: 1,
  },
};

const Table = () => {
  return (
    <UI.Col flexGrow={1} overflow={"auto"} position="relative" height={"100%"}>
      <div style={{ width: "100%" }}>
        <UI.Row
          sx={{
            display: "inline-flex",
            position: "sticky",
            top: 0,
            zIndex: 9,
            bgcolor: "white",
          }}
        >
          <UI.Row
            sx={{
              position: "sticky",
              left: 0,
              top: 0,
              zIndex: 99,
              bgcolor: "red",
            }}
          >
            <UI.Col
              sx={{
                // position: "sticky",
                width: 100,
                flexShrink: 0,
                ...styles.border,
                paddingLeft: "8px",
                paddingBottom: "8px",
                flexShrink: 0,
                bgcolor: "white",
              }}
              justifyContent="flex-end"
            >
              Detail
            </UI.Col>
            <UI.Col
              sx={{
                position: "sticky",
                width: 100,
                zIndex: 99,
                flexShrink: 0,

                ...styles.border,
                paddingBottom: "8px",
                flexShrink: 0,
                paddingLeft: "8px",
                bgcolor: "white",
              }}
              justifyContent="flex-end"
            >
              Detail2xx
            </UI.Col>
            <UI.Col
              sx={{
                position: "sticky",
                zIndex: 99,
                width: 100,
                flexShrink: 0,
                ...styles.border,
                paddingBottom: "8px",
                flexShrink: 0,
                paddingLeft: "8px",
                bgcolor: "white",
                borderRight: "2px solid grey",
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
              <UI.Text textAlign="center" style={styles.border} py={1}>
                {month}
              </UI.Text>
              <UI.Row flex={1} justifyContent="space-between">
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
              height: config.rowHeight,
              zIndex: 1,
              display: "inline-flex",
            }}
          >
            <UI.Col
              sx={{
                position: "sticky",
                left: 0,
                width: 100,
                flexShrink: 0,
                bgcolor: "inherit",
                ...styles.border,
                paddingLeft: "8px",
                justifyContent: "center",
                zIndex: 8,
              }}
            >
              {item}
            </UI.Col>
            <UI.Col
              sx={{
                position: "sticky",
                left: 100,
                width: 100,
                bgcolor: "inherit",
                flexShrink: 0,

                ...styles.border,
                paddingLeft: "8px",
                justifyContent: "center",
                zIndex: 8,
              }}
            >
              D2{item}
            </UI.Col>
            <UI.Col
              sx={{
                position: "sticky",
                left: 200,
                bgcolor: "inherit",
                width: 100,
                flexShrink: 0,

                ...styles.border,
                paddingLeft: "8px",
                justifyContent: "center",
                zIndex: 8,
                borderRight: "2px solid grey",
              }}
            >
              D3{item}
            </UI.Col>
            {months.flatMap((_, monthIndex) =>
              Array.from({ length: weeksPerMonth }, (_, weekIndex) => (
                <UI.Col
                  key={`M${monthIndex}-R${rowIndex}-W${weekIndex + 1}`}
                  sx={{
                    zIndex: 1,
                    height: config.rowHeight,
                  }}
                  center
                >
                  <UI.Text
                    variant="body2"
                    sx={{
                      ...styles.border,
                      width: config.cellWidth,
                      textAlign: "right",
                      height: config.rowHeight,
                    }}
                  >
                    {h.curr.format(Math.random() * 1000000, "")} {/* Example data */}
                  </UI.Text>
                </UI.Col>
              ))
            )}
          </UI.Row>
        ))}
      </div>
    </UI.Col>
  );
};

export default Table;
