import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import { regions } from "utils/regions";
import { InputLabel } from "@mui/material";

export default function RoleSelectInput({
  label,
  input,
  classes,
  meta,
  ...custom
}) {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        error={meta.touched ? meta.invalid : null}
        fullWidth
        helperText={meta.touched ? meta.error : null}
        label={label}
        placeholder={label}
        {...input}
        {...custom}
      >
        {regions.map((reg) => (
          <MenuItem key={reg.id} value={reg.id}>
            {reg.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

RoleSelectInput.propTypes = {
  props: {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    classes: PropTypes.object,
    meta: PropTypes.object,
    input: PropTypes.object,
    custom: PropTypes.object,
  },
};

RoleSelectInput.defaultProps = {
  props: {
    label: "",
    placeholder: "Enter your text",
    classes: {},
    meta: {},
    input: {},
    custom: {},
  },
};
