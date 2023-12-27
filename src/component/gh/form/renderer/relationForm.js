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

export default function Main({ model, label, name, value, onChange, ...props }) {
  const schema = useFetch({ url: `schema/${model}` });
  const [defaultValue, setdefaultValue] = useState();

  function hiddenCol(d) {
    let hidden = ["id", "deleted_at", "created_at", "updated_at"];
    if (hidden.includes(d.name)) {
      return false;
    }
    if (d.kind == "object" && !d.isList) {
      return false;
    }
    if (d.kind == "object" && d.relationName.toLowerCase().includes("to" + name)) {
      return false;
    }

    if (d.deleted_at) {
      return false;
    }

    return true;
  }

  useEffect(() => {
    if (schema?.get() && !defaultValue) {
      let temp = schema?.get().reduce((a, b) => ({ ...a, [b.name]: "" }), {});
      setdefaultValue(temp);
    }
  }, [schema]);

  function handleAdd() {
    onChange({ target: { value: [...value, defaultValue] } });
  }

  function handleDelete(index) {
    let temp = value;
    temp[index].deleted_at = new Date();
    onChange({ target: { value: [...temp] } });
  }
  function handleChange(v, index) {
    let temp = value;
    temp[index] = { ...temp[index], [v?.target?.name]: v?.target?.value };
    onChange({ target: { value: [...temp] } });
  }

  return (
    <UI.Col spacing={0.5} width={props.fullWidth ? "100%" : "auto"}>
      <UI.FormLabel label={label} />
      {/* ACTUAL FORM RENDERER */}
      <UI.Col spacing={1}>
        {schema.get() &&
          value
            ?.filter((d) => !d?.deleted_at)
            .map((v, vix) => (
              <UI.Row spacing={2} key={vix} alignItems={"flex-end"}>
                <UI.IconButton onClick={() => handleDelete(vix)}>
                  <Icon.Close />
                </UI.IconButton>
                {schema
                  .get()
                  ?.filter(hiddenCol)
                  .map((d, ix) => (
                    <React.Fragment key={ix}>
                      <DynamicFormRenderer
                        grow={1}
                        d={d}
                        key={ix}
                        disableMultiline
                        disableLabel={vix != 0}
                        value={v[d?.name]}
                        onChange={(e) => handleChange(e, vix)}
                      />
                      {/* {d.kind == "object" &&
                        Boolean(d.isList) && ( //equals to has many
                          <RelationInput
                            schema={d.name}
                            label={labelRender(d.name)}
                            name={d.name}
                            value={handleChange}
                            onChange={handleChange}
                          />
                        )} */}
                    </React.Fragment>
                  ))}
              </UI.Row>
            ))}
      </UI.Col>
      <UI.Row alignItems="flex-end" justifyContent="flex-end">
        <UI.Button
          variant={"outlined"}
          onClick={handleAdd}
          sx={{
            width: "180px",
          }}
        >
          Add {name}
        </UI.Button>
      </UI.Row>
    </UI.Col>
  );
}

function name(params) {}

const validationSchema = yup.object({});
