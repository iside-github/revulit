import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { Field, reduxForm } from "redux-form";
import TextInput from "components/dashboard/customer/TextField";
import RoleSelectInput from "./RoleSelect";
import CompanySelectInout from "./CompanySelect";
import { LoadingButton } from "@mui/lab";

const CreateUser = () => {
  return (
    <Stack my={2}>
      <Grid container spacing={2}>
        <Grid item container spacing={2} xs={12} md={6}>
          <Grid item xs={12}>
            <Field
              component={TextInput}
              label="User name"
              placeholder="User name"
              name="name"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextInput}
              label="User email"
              placeholder="User email"
              name="email"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field
              component={CompanySelectInout}
              label="Select role"
              placeholder="Select role"
              name="role"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field
              component={RoleSelectInput}
              label="Select company"
              placeholder="Select company"
              name="company"
            />
          </Grid>
          <Grid item xs={12}>
            <Stack alignItems="center" mt={2}>
              <LoadingButton variant="contained">Create user</LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

function validate(values) {
  let errors = {};
  const requiredFields = ["name", "email"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Field is required!";
    }

    if (values["email"] && !/[^\s]*@[a-z0-9.-]*/i.test(values["email"])) {
      errors["email"] = "Invalid email address";
    }
  });
  return errors;
}

export default reduxForm({
  form: "invite_user",
  validate,
})(CreateUser);
