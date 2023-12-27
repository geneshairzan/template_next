import React, { useState, useEffect } from "react";

import UI from "@/component/gh/ui";
import Icon from "@gh/icon";

import { useFormik } from "formik";
import { useContext } from "react";
import Context from "@context/app";
import { useRouter } from "next/router";

import * as yup from "yup";
import useFetch from "@gh/helper/useFetch";

import DynamicFormRenderer from "@gh/form/renderer";

export default function Main({ refdata }) {
  const { app } = useContext(Context);
  const router = useRouter();
  const schema = useFetch({ url: `schema/${router.query.model}` });

  const formik = useFormik({
    initialValues: refdata ? refdata : {},
    validationSchema: validationSchema,
    onSubmit: async (payload) => {
      console.log(payload);
      let res = await schema.fetch(
        {
          url: `${router.query.model}`,
          method: "post",
          data: {
            ...payload,
          },
        },
        {
          type: "success",
          message: "Form Submitted",
        }
      );
      router.push(`/${router.query.model}`);
    },
  });

  function hiddenCol(d) {
    let hidden = ["id", "deleted_at", "created_at", "updated_at"];
    if (hidden.includes(d.name)) {
      return false;
    }
    if (d.kind == "object" && !d.isList) {
      return false;
    }

    return true;
  }

  return (
    <UI.Col spacing={2}>
      <UI.Row alignItems="center" spacing={1}>
        <UI.IconButton onClick={() => router.back()}>
          <Icon.Back />
        </UI.IconButton>
        <UI.Text variant="h6" bold capitalize>
          {router.query.model}
        </UI.Text>
      </UI.Row>

      {/* ACTUAL FORM RENDERER */}
      {schema
        .get()
        ?.filter(hiddenCol)
        .map((d, ix) => (
          <DynamicFormRenderer formik={formik} d={d} key={ix} />
        ))}

      <UI.Row alignItems="flex-end">
        <UI.Button
          onClick={formik.handleSubmit}
          type="submit"
          sx={{
            width: "180px",
          }}
        >
          Save Changes
        </UI.Button>
      </UI.Row>
    </UI.Col>
  );
}

const validationSchema = yup.object({});
