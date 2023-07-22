import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const roles = [
  {
    role: "user",
    title: "Company user",
  },
  {
    role: "admin",
    title: "Company owner",
  },
  {
    role: "superadmin",
    title: "Software owner",
  },
];

export default function RoleSelectInput({
  label,
  input,
  classes,
  meta,
  ...custom
}) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    input.onChange(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id="demo-multiple-checkbox-label">
        Select user roles
      </InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={input.value ? input.value : []}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {roles?.map((role) => (
          <MenuItem key={role.role} value={role.role}>
            <Checkbox checked={input.value.includes(role.role)} />
            <ListItemText primary={role.title} />
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
