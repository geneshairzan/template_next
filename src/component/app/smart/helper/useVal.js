import React, { useState } from "react";

export default function name(initialState = 0) {
  const [value, setValue] = useState(initialState);
  return {
    val: value,
    set: setValue,
    setOff: () => setValue(0),
    setOn: () => setValue(100),
    toggle: () => setValue(value > 0 ? 0 : 100),
  };
}
