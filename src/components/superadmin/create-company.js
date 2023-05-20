import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { Field, reduxForm, reset } from "redux-form";
import TextInput from "components/dashboard/customer/TextField";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { createCompany } from "redux-store/company/index.slice";
import { getCompaniesList } from "redux-store/company/index.slice";

const CreateCompany = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.company.isCreateLoading);

  const update = () => {
    dispatch(reset("create_company"));
    dispatch(getCompaniesList());
  };

  const handleCompanyCreate = (values) => {
    dispatch(createCompany({ data: values, update }));
  };

  return (
    <Stack my={2}>
      <Grid container spacing={2}>
        <Grid item container spacing={2} xs={12} md={6}>
          <Grid item xs={12}>
            <Field
              component={TextInput}
              label="Company name"
              placeholder="Company name"
              name="name"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextInput}
              label="Company email"
              placeholder="Company email"
              name="email"
            />
          </Grid>
          <Grid item xs={12}>
            <Stack alignItems="center" mt={2}>
              <LoadingButton
                onClick={handleSubmit(handleCompanyCreate)}
                loading={isLoading}
                variant="contained"
              >
                Create company
              </LoadingButton>
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
  form: "create_company",
  validate,
})(CreateCompany);
