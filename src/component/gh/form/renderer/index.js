import React, { useState, useEffect } from "react";

import UI from "@/component/gh/ui";
import Icon from "@gh/icon";

import { useFormik } from "formik";
import { useContext } from "react";
import Context from "@context/app";
import { useRouter } from "next/router";

import * as yup from "yup";
import Form from "@gh/form";
import useFetch from "@gh/helper/useFetch";

export default function App({ refdata }) {
  const { app } = useContext(Context);
  const router = useRouter();
  const schema = useFetch({ url: `schema/${router.query.model}` });

  const formik = useFormik({
    initialValues: refdata ? refdata : {},
    validationSchema: validationSchema,
    onSubmit: async (payload) => {
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

  function labelRender(raw) {
    // if (raw.includes("_id")) return raw;
    return raw.replaceAll("_id", " ").replaceAll("_", " ");
  }
  // console.log(schema.get());
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
      {schema
        .get()
        ?.filter(hiddenCol)
        .map((d, ix) => (
          <React.Fragment key={ix}>
            {!d.name.includes("_id") && d?.type == "String" && (
              <Form.Text
                label={labelRender(d.name)}
                multiline={d.name == "desc"}
                rows={5}
                name={d.name}
                value={formik.values[d.name]}
                onChange={formik.handleChange}
              />
            )}

            {!d.name.includes("_id") && d?.type == "Int" && (
              <Form.Currency
                prefix=""
                suffix=""
                label={labelRender(d.name)}
                name={d.name}
                value={formik.values[d.name]}
                onChange={(v) => {
                  formik.setFieldValue(d.name, parseInt(v?.target?.value));
                }}
              />
            )}

            {d.name.includes("_id") && (
              <Form.Data
                createable
                url={d.name.replace("_id", "")}
                label={labelRender(d.name)}
                name={d.name}
                data
                value={formik.values[d.name]}
                onChange={formik.handleChange}
              />
            )}
            {d.kind == "object" && console.log(d)}
            {d.kind == "object" && Boolean(d.isList) && (
              <RelationInput
                type={d.type}
                label={labelRender(d.name)}
                name={d.name}
                value={formik.values[d.name]}
                onChange={formik.handleChange}
              />
            )}
          </React.Fragment>
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

function RelationInput({ type, ...props }) {
  const El = Form[type];
  return <El {...props} />;
}

const validationSchema = yup.object({});
