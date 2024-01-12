import * as React from "react";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Stack, Checkbox } from "@mui/material";

export default function RadioButtonsGroup({ label, defaultChecked = false, onChange, value, name }) {
  return (
    <FormControlLabel
      control={<Checkbox checked={value ? true : false} />}
      label={label}
      onChange={(e) =>
        onChange({
          target: {
            name: name,
            value: e.target.checked,
          },
        })
      }
      sx={{
        m: !label && 0,
      }}
    />
  );
}
