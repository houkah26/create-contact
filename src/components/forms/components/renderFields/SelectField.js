import React from "react";
import { Form } from "semantic-ui-react";
import { startCase } from "lodash";

const SelectField = ({
  input,
  type,
  meta: { touched, error },
  displayName,
  selectOptions,
  required,
  width
}) => {
  const name = displayName || startCase(input.name);
  const displayError = touched && error && true;

  return (
    <Form.Field error={displayError} required={required} width={width}>
      <label>{name}</label>
      <select {...input}>
        <option value="" key=" ">
          {" "}
        </option>
        {selectOptions.map(opt => (
          <option value={opt.value} key={opt.key}>
            {opt.key}
          </option>
        ))}
      </select>
      {displayError && (
        <span style={{ color: "#9F3A38" }} className="error">
          {error}
        </span>
      )}
    </Form.Field>
  );
};

export default SelectField;
