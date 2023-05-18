import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import * as React from "react";

const TextInput = ({ label, input, classes, meta, ...custom }) => {
  return (
    <TextField
      error={meta.touched ? meta.invalid : null}
      fullWidth
      helperText={meta.touched ? meta.error : null}
      label={label}
      placeholder={label}
      {...input}
      {...custom}
      alue={meta?.initial ? meta.initial : ""}
    />
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  classes: PropTypes.object,
  meta: PropTypes.object,
  input: PropTypes.object,
  custom: PropTypes.object,
};

TextInput.defaultProps = {
  label: "",
  placeholder: "Enter your text",
  classes: {},
  meta: {},
  input: {},
  custom: {},
};

export default TextInput;
