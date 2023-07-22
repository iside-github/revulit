import {
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../scrollbar";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { Field, reduxForm } from "redux-form";
import { Stack } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { updatePassword } from "redux-store/user/user.slice";
import PasswordInputField from "./PasswordInput";

const AccountSecuritySettings = ({ handleSubmit }) => {
  const history = useSelector((state) => state.user.data?.sessions);
  const dispatch = useDispatch();

  const handleEdit = (values) => {
    dispatch(updatePassword(values));
  };

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Change password</Typography>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <Stack width="100%">
                <Field
                  component={PasswordInputField}
                  name="oldPassword"
                  label="Old password"
                  placeholder="Old password"
                  type="password"
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderStyle: "dotted",
                    },
                  }}
                />
                <Stack width="100%" mt={2}>
                  <Field
                    component={PasswordInputField}
                    label="New password"
                    placeholder="New password"
                    type="password"
                    name="password"
                    size="small"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderStyle: "dotted",
                      },
                    }}
                  />
                </Stack>
                <Stack width="100%" mt={2}>
                  <Field
                    component={PasswordInputField}
                    label="Confirm password"
                    placeholder="Confirm password"
                    type="password"
                    name="confirm_password"
                    size="small"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderStyle: "dotted",
                      },
                    }}
                  />
                </Stack>
              </Stack>
              <Stack mt={3} alignItems="center">
                <LoadingButton
                  variant="contained"
                  onClick={handleSubmit(handleEdit)}
                >
                  Save new password
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6">Login history</Typography>
          <Typography color="textSecondary" sx={{ mt: 1 }} variant="body2">
            Your recent login activity:
          </Typography>
        </CardContent>
        <Scrollbar>
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell>Login type</TableCell>
                <TableCell>IP Address</TableCell>
                <TableCell>Client</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history??.map((each) => (
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2">
                      Credentials login
                    </Typography>
                    <Typography variant="body2" color="body2">
                      On{" "}
                      {format(
                        each.createdAt ? new Date(each.createdAt) : new Date(),
                        "HH:mm dd-MMM, yyyy"
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell>{each.ip_address}</TableCell>
                  <TableCell>{each?.device}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </Card>
    </>
  );
};

function validate(values) {
  let errors = {};
  const requiredFields = ["oldPassword", "password", "confirm_password"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Field is required!";
    }
  });

  if (values["confirm_password"] !== values["password"]) {
    errors["confirm_password"] =
      "Confirm password doesn't match with new password";
  }

  if (values["password"] && values["password"].length < 8) {
    errors["password"] = "Password should ne at least 8 length long";
  }

  return errors;
}

export default reduxForm({
  form: "create_user",
  validate,
})(AccountSecuritySettings);
