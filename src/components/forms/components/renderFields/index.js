import React from "react";
import { Field } from "redux-form";
import InputField from "./InputField";
import SelectField from "./SelectField";

const renderFields = inputFields =>
  inputFields.map(({ name, type = "text", ...rest }) => {
    if (type === "select") {
      return (
        <Field
          name={name}
          type={type}
          component={SelectField}
          key={name}
          {...rest}
        />
      );
    }

    return (
      <Field
        name={name}
        type={type}
        component={InputField}
        key={name}
        {...rest}
      />
    );
  });

export default renderFields;
