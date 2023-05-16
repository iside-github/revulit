import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Box, FormHelperText, TextField } from "@mui/material";
import { sendRecoveryEmail } from "redux-store/user/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";

export const AmplifyPasswordRecovery = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
    }),
    onSubmit: async (values, helpers) => {
      dispatch(sendRecoveryEmail({ email: values.email, router, helpers }));
    },
  });

  const isLoading = useSelector((state) => state.auth.isRecoveryLoading);

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      <TextField
        autoFocus
        error={Boolean(formik.touched.email && formik.errors.email)}
        fullWidth
        helperText={formik.touched.email && formik.errors.email}
        label="Email Address"
        margin="normal"
        name="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="email"
        value={formik.values.email}
      />
      <Box sx={{ mt: 3 }}>
        <LoadingButton
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          Recover Password
        </LoadingButton>
      </Box>
    </form>
  );
};
