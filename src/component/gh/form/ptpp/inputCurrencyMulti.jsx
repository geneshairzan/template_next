//https://s-yadav.github.io/react-number-format/docs/intro/

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import { TextField, MenuItem } from "@mui/material";
import Label from "./label";
import _ from "lodash";
import UI from "@component/gip-ui";
import Form, { fetcher } from "@component/gip-form";
import { handleInput, handleAdd, handleDelete, AddButton } from "./multiHelper";

import Context from "@context/app";

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
  const { formconfig, auth } = React.useContext(Context);
  const blank = {
    // curr: 1,
  };

  const [option, setoptions] = React.useState();
  React.useEffect(() => {
    formconfig?.data?.config?.length && setoptions(formconfig.data.config.filter((d) => d.nameshort == "currencylist"));
  }, [formconfig]);

  useEffect(() => {
    if (!value) onChange([]);
  }, []);

  if (!value || !option) return <UI.Loader />;

  return (
    <UI.Stack spacing={1} width={props.fullWidth ? "100%" : "auto"}>
      <Label label={props.label} tip={props.tip} />
      {value.map((d, ix) => (
        <UI.Row spacing={1} key={ix}>
          <Form.FinderSetting
            noLabel
            disabled={ix != value.length - 1}
            config="currencylist"
            disableClearable={true}
            value={d.curr}
            onChange={(v) => handleInput(value, onChange, v.target.value, ix, "curr")}
            exept={value.map((dx, dix) => (dix != ix ? parseInt(dx.curr) : null))}
            placeholder="curr"
          />
          <TextField
            name="multicurr"
            fullWidth
            sx={{
              bgcolor: "white.main",
            }}
            placeholder={props.label}
            inputProps={{
              prefix: "",
            }}
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
            label=""
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            value={parseInt(d.value)}
            onChange={(e) => handleInput(value, onChange, e.target.value, ix, "value")}
          />
          <UI.IconButton onClick={() => handleDelete(value, onChange, ix)}>
            <UI.Icons.Close />
          </UI.IconButton>
        </UI.Row>
      ))}
      {value.length < option.length && (
        <AddButton onClick={() => handleAdd(value, onChange, blank)} addText="+ Tambah Kurs" />
      )}
    </UI.Stack>
  );
}
