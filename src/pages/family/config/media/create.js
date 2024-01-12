import React, { useState, useEffect } from "react";

import UI from "@/component/gh/ui";
import Icon from "@gh/icon";
import Form from "@gh/form";

import { useFormik } from "formik";
import { useContext } from "react";
import Context from "@context/app";
import { useRouter } from "next/router";

import * as yup from "yup";
import useFetch, { fetcher } from "@gh/helper/useFetch";

import DynamicFormRenderer from "@gh/form/renderer";
import RelationForm from "@gh/form/renderer/relationForm";
import { getInfo } from "@/model";
import _ from "lodash";

export default function Main({ refdata }) {
  const { app } = useContext(Context);
  const router = useRouter();
  const modelInfo = getInfo(router.query.model);
  const [err, seterr] = useState("");

  const formik = useFormik({
    initialValues: refdata ? refdata : {},
    validationSchema: modelInfo?.validationSchema || null,
    onSubmit: async (payload) => {
      let res = await fetcher(
        {
          url: `family/media`,
          method: "post",
          data: _.omit(payload, ["new_img"]),
        },
        {
          type: "success",
          message: "Form Submitted",
        }
      );

      if (res?.data?.id && payload?.new_img) {
        let up = await fetcher(
          {
            multipart: true,
            url: `upload`,
            method: "post",
            data: {
              new_img: payload?.new_img,
              pid: res?.data?.id,
              name: res?.data?.id,
              storage: "media",
              model: "media",
            },
          },
          {
            type: "success",
            message: "Form Submitted",
          }
        );
      }
      res?.data?.id
        ? router.push(`/family/config?on=floors`)
        : formik.setErrors({ email: "someone registered with this email" });
    },
  });

  return (
    <UI.Col
      width="100%"
      sx={{
        height: "100%",
        width: "100%",
        bgcolor: "#2a2d2e",
      }}
      alignItems="center"
      pt="10vh"
    >
      <UI.Col width="100%" maxWidth="960px" spacing={2}>
        <UI.Row alignItems="center" spacing={1}>
          <UI.IconButton onClick={() => router.back()}>
            <Icon.Back />
          </UI.IconButton>
          <UI.Text variant="h6" bold capitalize>
            New Media
          </UI.Text>
        </UI.Row>
        <Form.Text name="title" value={formik.values.title} onChange={formik.handleChange} />
        <Form.ImgCrop
          result={(v) => formik.setFieldValue("new_img", v)}
          refimg={formik?.values?.img && "/api/file/media/" + formik.values.img}
        />

        <UI.Row alignItems="flex-end">
          <UI.Button
            disabled={formik.onSubmit}
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
    </UI.Col>
  );
}
