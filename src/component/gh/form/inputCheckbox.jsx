import * as React from "react";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Stack, Checkbox } from "@mui/material";

export default function RadioButtonsGroup({ label, defaultChecked = false, onChange, checked, name }) {
  return (
    <FormControlLabel
      control={<Checkbox checked={checked ? true : false} />}
      label={label}
      onChange={onChange}
      sx={{
        m: !label && 0,
      }}
    />
  );
}
