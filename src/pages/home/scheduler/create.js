import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import Icon from "@gh/icon";
import Form from "@gh/form";
import MainNav from "@/component/app/smart/mainNav";
import MainHeader from "@/component/app/smart/mainHeader";
import MainGeneralInfo from "@/component/app/smart/mainGeneralInfo";
import RoomCards from "@/component/app/smart/roomCards";
import { rooms, pages } from "@/component/app/smart/data";

import useFetch, { fetcher } from "@gh/helper/useFetch";
// import useLog from "@gh/helper/useLog";
import Context from "@context/app";

import { useFormik } from "formik";
import * as yup from "yup";
import _, { values } from "lodash";
import MenuItem from "@mui/material/MenuItem";

export default function App({ onedit, hasSubmit, onClose }) {
  const { auth } = React.useContext(Context);
  const [open, setopen] = useState(Boolean(onedit));
  const device = useFetch({ url: "family/device" });
  const log = useFetch({ url: "family/device" });

  useEffect(() => {
    !open && onClose(null);
  }, [open]);

  function handleClose(isSubmit = false) {
    setopen(false);
    if (isSubmit) {
      hasSubmit();
      formik.setValues({});
    }
  }

  useEffect(() => {
    if (onedit) {
      formik.setValues(onedit);
      setopen(Boolean(true));
    }
  }, [onedit]);

  const formik = useFormik({
    initialValues: onedit ? onedit : {},
    validationSchema: null,
    onSubmit: async (payload) => {
      let res = await fetcher(
        {
          url: `family/deviceschedule`,
          method: "post",
          data: _.omit(payload, ["author"]),
        },
        {
          type: "success",
          message: "Form Submitted",
        }
      );

      if (onedit && onedit?.status_id != payload?.status_id) {
        let logging = await fetcher(
          {
            url: `log`,
            method: "post",
            data: {
              title: `Automation ${payload.status_id == 1 ? "active" : "deactive"}`,
              body: `${auth?.user?.name} set ${payload.status_id == 1 ? "active" : "deactive"} automation '${
                payload?.name
              }' `,
            },
          },
          {
            type: "success",
            message: "Form Submitted",
          }
        );
      }
      res?.data && handleClose(true);
    },
  });

  function handleTrigger(v, target) {
    formik.setFieldValue("trigger", { ...formik.values?.trigger, [target]: v });
  }

  return (
    <>
      <UI.Row justifyContent="flex-end" height="100%">
        <UI.Button
          startIcon={<Icon.Plus />}
          onClick={() => setopen(true)}
          sx={{
            height: "100%",
          }}
        >
          {onedit ? "Edit Schedule" : "New Schedule"}
        </UI.Button>
      </UI.Row>
      <UI.Modal open={open}>
        <UI.Col
          spacing={2}
          sx={{
            width: "100vw",
            maxWidth: 600,
            p: 2,
          }}
        >
          <UI.Col
            spacing={2}
            sx={{
              width: "100%",
              bgcolor: "smartSecondary.main",
              borderRadius: 3,
              p: 2,
            }}
          >
            <UI.Row justifyContent="space-between" alignItems="center">
              <UI.Text variant="h6" color="smart.main">
                Add New Schedule
              </UI.Text>
              <UI.IconButton onClick={handleClose}>
                <Icon.Close />
              </UI.IconButton>
            </UI.Row>
            <Form.Text name="name" value={formik.values?.name || ""} onChange={formik.handleChange} />
            <Form.Data
              url="status"
              label="Status"
              name="status_id"
              value={formik.values?.status_id || ""}
              onChange={formik.handleChange}
            />
            <UI.Row spacing={1}>
              <UI.Col flexGrow={1}>
                <Form.Days
                  label="Trigger Day"
                  value={formik.values?.trigger?.day}
                  onChange={(v) => handleTrigger(v, "day")}
                />
              </UI.Col>
              <UI.Col width="98px" pr={1}>
                <Form.Time
                  label="Trigger Time"
                  value={formik.values?.trigger?.time}
                  onChange={(v) => handleTrigger(v, "time")}
                />
              </UI.Col>
            </UI.Row>
            <InputDevice
              options={device.get()}
              value={formik.values?.action || []}
              onChange={(v) => formik.setFieldValue("action", v)}
            />

            <UI.Button onClick={formik.handleSubmit}>Submit</UI.Button>
          </UI.Col>
        </UI.Col>
      </UI.Modal>
    </>
  );
}

function InputDevice({ value, options, onChange }) {
  function handleChange(e, index) {
    let temp = value;
    let edit = temp[index];
    edit[e.name] = e.value;
    onChange([...temp]);
  }

  function handleDelete(ix) {
    let temp = value;
    temp.splice(ix, 1);
    onChange([...temp]);
  }

  return (
    <UI.Col>
      <UI.Row justifyContent="space-between" alignItems="flex-start">
        <Form.Label label="Actions" />
        <UI.Button startIcon={<Icon.Plus />} variant={"text"} onClick={() => onChange([...value, { name: "dsad" }])}>
          Add Actions
        </UI.Button>
      </UI.Row>

      <UI.Col
        spacing={1}
        sx={{
          maxHeight: "50vh",
          overflow: "auto",
          pr: 1,
        }}
      >
        {value?.map((d, ix) => (
          <UI.Row key={ix} spacing={1} alignItems="flex-end">
            <UI.IconButton color="error" onClick={(e) => handleDelete(ix)}>
              <Icon.Close />
            </UI.IconButton>
            <UI.Col flexGrow={1}>
              <SelectDevice
                options={options}
                onChange={(e) => handleChange(e.target, ix)}
                value={d?.did}
                noLabel={ix > 0}
              />
            </UI.Col>
            <SelectState
              options={options}
              onChange={(e) => handleChange(e.target, ix)}
              value={d?.states}
              noLabel={ix > 0}
            />
          </UI.Row>
        ))}
      </UI.Col>
    </UI.Col>
  );
}

function SelectDevice({ options, value, onChange, noLabel }) {
  return (
    <Form.Text name="did" label="Device" select onChange={onChange} value={value} noLabel={noLabel}>
      {options?.map((d) => (
        <MenuItem value={d.id}>{d.name}</MenuItem>
      ))}
    </Form.Text>
  );
}

function SelectState({ options, value, onChange, noLabel }) {
  return (
    <Form.Text
      name="states"
      select
      onChange={onChange}
      value={value}
      sx={{
        minWidth: 90,
      }}
      noLabel={noLabel}
    >
      <MenuItem value={"on"}>On</MenuItem>
      <MenuItem value={"off"}>Off</MenuItem>
    </Form.Text>
  );
}
