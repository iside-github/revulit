import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/system";
import { Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Field, reduxForm } from "redux-form";
import TextInput from "./TextField";
import { useDispatch, useSelector } from "react-redux";
import { inviteUser } from "redux-store/users/user.slice";
import { LoadingButton } from "@mui/lab";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "70%", md: 550 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "4px",
  p: 2,
};

function InviteModal({ open, setOpen, handleSubmit, resetForm }) {
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const sendInvite = (values) => {
    dispatch(inviteUser({ data: values, handleClose, resetForm }));
  };

  const isLoading = useSelector((state) => state.users.isInviteLoading);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            pl={2}
          >
            <Typography variant="h6">Invite user</Typography>
            <IconButton onClick={handleClose} color="error" variant="contained">
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack m={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  component={TextInput}
                  label="User name"
                  placeholder="User name"
                  name="name"
                />
              </Grid>
              <Grid item xs={12}>
                {" "}
                <Field
                  component={TextInput}
                  label="User email"
                  placeholder="User email"
                  name="email"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <Stack alignItems="center">
                  <LoadingButton
                    onClick={handleSubmit(sendInvite)}
                    variant="contained"
                    loading={isLoading}
                  >
                    Submit
                  </LoadingButton>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}

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
})(InviteModal);
