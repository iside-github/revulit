import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Box, FormHelperText, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { confirmEmailAddress } from "redux-store/users/user.slice";
import { LoadingButton } from "@mui/lab";

const SetConformation = (props) => {
  const router = useRouter();
  const itemsRef = useRef([]);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.users.isConfirmLoading);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
      passwordConfirm: "",
      submit: null,
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(7, "Must be at least 7 characters")
        .max(255)
        .required("Required"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values, helpers) => {
      dispatch(
        confirmEmailAddress({
          router,
          auth: router?.query?.auth,
          new_password: values.password,
          helpers,
        })
      );
    },
  });

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, 6);
  }, []);

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
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
      <TextField
        error={Boolean(
          formik.touched.passwordConfirm && formik.errors.passwordConfirm
        )}
        fullWidth
        helperText={
          formik.touched.passwordConfirm && formik.errors.passwordConfirm
        }
        label="Password Confirmation"
        margin="normal"
        name="passwordConfirm"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.passwordConfirm}
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
          Accept invite
        </LoadingButton>
      </Box>
    </form>
  );
};

export default SetConformation;
