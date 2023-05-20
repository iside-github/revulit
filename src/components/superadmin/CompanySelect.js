import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import { InputLabel } from "@mui/material";
import { useSelector } from "react-redux";

export default function CompanySelectInout({
  label,
  input,
  classes,
  meta,
  ...custom
}) {
  const companiesList = useSelector((state) => state.company.list);
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
        {companiesList.map((com) => (
          <MenuItem key={com.uid} value={com._id}>
            {com.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

CompanySelectInout.propTypes = {
  props: {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    classes: PropTypes.object,
    meta: PropTypes.object,
    input: PropTypes.object,
    custom: PropTypes.object,
  },
};

CompanySelectInout.defaultProps = {
  props: {
    label: "",
    placeholder: "Enter your text",
    classes: {},
    meta: {},
    input: {},
    custom: {},
  },
};
