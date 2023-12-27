import Form from "../index";

export default function FormRenderer({ d, formik }) {
  function labelRender(raw) {
    return raw.replaceAll("_id", " ").replaceAll("_", " ");
  }

  return (
    <>
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
      {/* {d.kind == "object" &&
        Boolean(d.isList) && ( //equals to has many
          <RelationInput
            type={d.type}
            label={labelRender(d.name)}
            name={d.name}
            // data
            value={formik.values[d.name]}
            onChange={formik.handleChange}
          />
        )} */}
    </>
  );
}

function RelationInput({ type, ...props }) {
  const El = Form[type]; // Form.ProjectReference
  return <El {...props} />;
}
