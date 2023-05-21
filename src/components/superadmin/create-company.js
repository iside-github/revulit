import { Avatar, Grid, styled } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Field, reduxForm, reset } from "redux-form";
import TextInput from "components/dashboard/customer/TextField";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { createCompany } from "redux-store/company/index.slice";
import { getCompaniesList } from "redux-store/company/index.slice";
import PhotoCamera from "icons/PhotoCamera";
import { useState } from "react";

const PhotIconButton = styled(Box)(({ theme }) => ({
  borderRadius: "50%",
  background: theme.palette.primary.main,
  position: "absolute",
  bottom: "-5px",
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  cursor: "pointer",
  zIndex: 54,
  borderColor: theme.palette.background.main,
  "&:hover": {
    background: theme.palette.primary.main,
  },

  [theme.breakpoints.down("md")]: {
    padding: "6px 5px 0px 5px",
    right: "auto",
    left: "60px",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  height: "70px",
  width: "70px",
  border: "1px solid",
  borderColor: theme.palette.background.dargGray,
}));

const CreateCompany = ({ handleSubmit }) => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.company.isCreateLoading);

  const update = () => {
    dispatch(reset("create_company"));
    dispatch(getCompaniesList());
  };

  const handleCompanyCreate = (values) => {
    const data = new FormData();
    data.append("name", values?.name);
    data.append("email", values?.email);
    if (values?.avatar) {
      data.append("avatar", values?.avatar);
    }
    dispatch(createCompany({ data, update }));
  };

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const CompanyAvatar = ({ input }) => {
    return (
      <Box position="relative" sx={{ width: "max-content", mb: 2 }}>
        <StyledAvatar src={file ? file : input?.value}>L</StyledAvatar>
        <PhotIconButton component="label" htmlFor="avatar">
          <PhotoCamera />
        </PhotIconButton>
        <Box
          component="input"
          type="file"
          accept="image/*"
          name="avatar"
          id="avatar"
          display="none"
          onChange={(e) => {
            handleChange(e);
            input.onChange(e.target.files[0]);
          }}
        />
      </Box>
    );
  };

  return (
    <Stack my={2}>
      <Grid container spacing={2}>
        <Grid item container spacing={2} xs={12} md={6}>
          <Grid item xs={12}>
            <Field
              component={CompanyAvatar}
              label="Company avatar"
              placeholder="Company avtar"
              name="avatar"
            />
          </Grid>
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
