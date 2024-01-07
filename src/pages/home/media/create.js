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

export default function App({ refdata, hasSubmit }) {
  const [open, setopen] = useState(false);

  const formik = useFormik({
    initialValues: refdata ? refdata : {},
    validationSchema: null,
    onSubmit: async (payload) => {
      let res = await fetcher(
        {
          url: `family/notes`,
          method: "post",
          data: payload,
        },
        {
          type: "success",
          message: "Form Submitted",
        }
      );
      setopen(false, hasSubmit(true));
    },
  });

  return (
    <>
      <UI.Row justifyContent="flex-end">
        <UI.Button startIcon={<Icon.Plus />} onClick={() => setopen(true)}>
          Add New Notes
        </UI.Button>
      </UI.Row>
      <UI.Modal open={open}>
        <UI.Col
          spacing={2}
          sx={{
            width: "100vw",
            maxWidth: 600,
            bgcolor: "smartSecondary.main",
            borderRadius: 3,
            p: 2,
          }}
        >
          <UI.Text variant="h6" color="smart.main">
            Add New Notes
          </UI.Text>
          <Form.Text name="title" value={formik.values.title} onChange={formik.handleChange} />
          <Form.Text name="body" value={formik.values.body} onChange={formik.handleChange} multiline rows={10} />
          <UI.Button onClick={formik.handleSubmit}>Submit</UI.Button>
        </UI.Col>
      </UI.Modal>
    </>
  );
}
