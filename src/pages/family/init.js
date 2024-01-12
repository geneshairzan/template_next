import React, { useEffect, useState } from "react";

import UI from "@gh/ui";
import Form from "@gh/form";
import { glass } from "@smart/data";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import Context from "@context/app";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";

export default function App(props) {
  const { app, auth } = React.useContext(Context);
  const router = useRouter();

  const [id, setid] = useState("");
  const [onCreate, setonCreate] = useState();
  const [err, seterr] = useState(false);

  useEffect(() => {
    if (auth?.user?.family_id) {
      if (auth?.user.role_id == 2) router.push("/family/config");
      if (auth?.user.role_id == 3) router.push("/home");
    }
  }, [auth?.user]);

  async function handleSubmit() {
    app.setOnLoading();
    let res = await fetcher({
      url: "family",
      method: "post",
      data: {
        family_id: id,
      },
    });
    res?.data?.id ? await auth.check() : seterr(true);
    app.setOffLoading();
  }

  return (
    <UI.Col center>
      <UI.Col
        height="50dvh"
        spacing={1}
        width="100vw"
        maxWidth={640}
        sx={{
          ...glass,
          p: 2,
          boderRadius: 3,
        }}
      >
        <UI.Row justifyContent="space-between" alignItems="flex-end">
          <UI.Text variant="h4" color="smart.main">
            Welcome Aboard
          </UI.Text>
          <UI.Button variant="text" onClick={() => setonCreate(true)}>
            new family
          </UI.Button>
        </UI.Row>

        {!onCreate && (
          <UI.Col color="smart.text">
            <UI.Text variant="body1">Seems like this is your first time join our platform</UI.Text>
            <UI.Text variant="body1">
              in order to continue using this application, please enter Family ID that you're belongs to
            </UI.Text>
            <UI.Row justifyContent="space-between" spacing={2} alignItems="center" height={64}>
              <Form.Text
                noLabel
                fullWidth
                placeholder="Family ID"
                value={id}
                onChange={(e) => setid(e.target.value)}
                // color="smartinput"
              />
              <UI.Button onClick={handleSubmit} color="smartSecondary" disabled={id?.length < 3}>
                Continue
              </UI.Button>
            </UI.Row>
            {err && (
              <UI.Text color="error.main" variant={"body2"}>
                incorect Organization ID
              </UI.Text>
            )}
          </UI.Col>
        )}
        {onCreate && <NewOrg />}
      </UI.Col>
    </UI.Col>
  );
}

function NewOrg(params) {
  const { app, auth } = React.useContext(Context);
  // const [orgID, setorgID] = useState("");

  // async function handleSubmit() {
  //   app.setOnLoading();
  //   let res = await fetcher({
  //     url: "family",
  //     method: "post",
  //     data: {
  //       name: orgID,
  //     },
  //   });
  //   res?.data?.id && (await auth.check());
  //   app.setOffLoading();
  // }

  const formik = useFormik({
    initialValues: {
      name: "",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1MzVhN2E1NjI0M2I0MWNiYTk4ZjIzM2JlOGIxNmExYyIsImlhdCI6MTcwNDQ2Nzk4NiwiZXhwIjoyMDE5ODI3OTg2fQ.vP5gkNQqyu5aPkvd9GWGnvsJnQaVdAFiqRonw6U7nJo",
      endpoint: "https://ha.genesha.dev",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let res = await fetcher({
        url: `family`,
        method: "post",
        data: values,
      });

      res?.data?.id && (await auth.check());
    },
  });

  function isValid() {
    if (formik.dirty && formik.isValid) return true;
    return false;
  }

  return (
    <UI.Col justifyContent="space-between" height="100%">
      <UI.Col spacing={2}>
        <UI.Text variant="body1">please enter your family information & details</UI.Text>
        <Form.Text label="Family name" name="name" value={formik.values.name} onChange={formik.handleChange} />
        <Form.Text name="endpoint" value={formik.values.endpoint} onChange={formik.handleChange} />
        <Form.Text name="token" value={formik.values.token} onChange={formik.handleChange} />
      </UI.Col>
      <UI.Button onClick={formik.handleSubmit} disabled={formik.onSubmit || !isValid()}>
        Continue
      </UI.Button>
    </UI.Col>
  );
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Required"),
  endpoint: yup.string().required("Required"),
  token: yup.string().required("Required"),
});
