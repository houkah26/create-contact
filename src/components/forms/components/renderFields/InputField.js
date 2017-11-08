import React from "react";
import { Form } from "semantic-ui-react";
import { startCase } from "lodash";

const InputField = ({
  input,
  type,
  meta: { touched, error },
  displayName,
  inputOptions,
  required,
  width
}) => {
  const name = displayName || startCase(input.name);
  const displayError = touched && error && true;

  return (
    <Form.Field error={displayError} required={required} width={width}>
      <label>{name}</label>
      <input type={type} {...inputOptions} {...input} />
      {displayError && (
        <span style={{ color: "#9F3A38" }} className="error">
          {error}
        </span>
      )}
    </Form.Field>
  );
};

export default InputField;
