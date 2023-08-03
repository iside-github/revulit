import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Box,  FormHelperText, TextField } from "@mui/material";
import { loginUser } from "redux-store/user/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";

export const JWTLogin = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoginLoading = useSelector((state) => state.auth.isLoginLoading);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      dispatch(
        loginUser({data: { email: values.email, password: values.password }, router})
      );

      // const result = await signIn("credentials", {
      //   email: values.email,
      //   password: values.password,
      //   redirect: false,
      // });
      // if (!result.error) {
      //   const returnUrl = router.query.returnUrl || "/dashboard";
      //   router.push(returnUrl).catch(console.error);
      // }

      // if (result.error) {
      //   helpers.setStatus({ success: false });
      //   toast.error(result.error);
      //   helpers.setSubmitting(false);
      // }
    },
  });

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
      <TextField
        error={Boolean(formik.touched.password && formik.errors.password)}
        fullWidth
        helperText={formik.touched.password && formik.errors.password}
        label="Password"
        margin="normal"
        name="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.password}
      />
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        <LoadingButton
          disabled={formik.isSubmitting}
          loading={isLoginLoading}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Log In
        </LoadingButton>
      </Box>
    </form>
  );
};
