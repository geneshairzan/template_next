//https://s-yadav.github.io/react-number-format/docs/intro/

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import { TextField, MenuItem } from "@mui/material";
import Label from "./label";
import _ from "lodash";
import UI from "@component/gip-ui";
import Form, { fetcher } from "@component/gip-form";
import { handleInput, handleAdd, handleDelete } from "./multiHelper";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, prefix, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      // isNumericString
      prefix={prefix}
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function FormattedInputs({ prefix = `IDR `, value, onChange, ...props }) {
  const blank = {
    curr: 1,
  };

  useEffect(() => {
    if (!value) onChange(blank);
  }, []);

  function handleValue(e, target) {
    onChange({ ...value, [target]: e.target.value });
  }

  if (!value) return <UI.Loader />;

  return (
    <UI.Stack spacing={1} width={props.fullWidth ? "100%" : "auto"}>
      <UI.Row spacing={1}>
        <UI.Col width={90} flexShrink={0}>
          <Form.FinderSetting
            fullWidth
            noLabel
            config="currencylist"
            value={value.curr}
            onChange={(v) => handleValue(v, "curr")}
          />
        </UI.Col>
        <UI.Col flexGrow={1} flexBasis={1}>
          <TextField
            name="multicurr"
            fullWidth
            sx={{
              bgcolor: "white.main",
              width: "100%",
            }}
            placeholder={props.label}
            inputProps={{
              prefix: "",
            }}
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
            label=""
            value={parseInt(value.value)}
            onChange={(e) => handleValue(e, "value")}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </UI.Col>

        <UI.Col flexGrow={1} flexBasis={1}>
          <TextField
            name="multicurr"
            fullWidth
            sx={{
              bgcolor: "white.main",
              width: "100%",
            }}
            placeholder={props.label}
            inputProps={{
              prefix: "",
            }}
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
            label=""
            value={parseInt(value.valuever)}
            onChange={(e) => handleValue(e, "valuever")}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </UI.Col>
      </UI.Row>
    </UI.Stack>
  );
}
