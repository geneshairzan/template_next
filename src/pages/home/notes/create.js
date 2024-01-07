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

import { useFormik } from "formik";
import * as yup from "yup";
import _ from "lodash";

export default function App({ onedit, hasSubmit, onClose }) {
  const [open, setopen] = useState(Boolean(onedit));

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
          url: `family/notes`,
          method: "post",
          data: _.omit(payload, ["author"]),
        },
        {
          type: "success",
          message: "Form Submitted",
        }
      );
      res?.data && handleClose(true);
    },
  });

  return (
    <>
      <UI.Row justifyContent="flex-end">
        <UI.Button startIcon={<Icon.Plus />} onClick={() => setopen(true)}>
          {onedit ? "Edit Notes" : "Add New Notes"}
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
              maxWidth: 600,
              bgcolor: "smartSecondary.main",
              borderRadius: 3,
              p: 2,
            }}
          >
            <UI.Row justifyContent="space-between" alignItems="center">
              <UI.Text variant="h6" color="smart.main">
                Add New Notes
              </UI.Text>
              <UI.IconButton onClick={handleClose}>
                <Icon.Close />
              </UI.IconButton>
            </UI.Row>
            <Form.Text name="title" value={formik.values?.title} onChange={formik.handleChange} />
            <Form.Text name="body" value={formik.values?.body} onChange={formik.handleChange} multiline rows={10} />
            <UI.Button onClick={formik.handleSubmit}>Submit</UI.Button>
          </UI.Col>
        </UI.Col>
      </UI.Modal>
    </>
  );
}
