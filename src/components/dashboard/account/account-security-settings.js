import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "../../../icons/arrow-right";
import { Scrollbar } from "../../scrollbar";
import { useSelector } from "react-redux";
import { format } from "date-fns";

export const AccountSecuritySettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const history = useSelector((state) => state.user.data?.sessions);

  const handleEdit = () => {
    setIsEditing(!isEditing);
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField
                  disabled={!isEditing}
                  label="Password"
                  type="password"
                  defaultValue="Thebestpasswordever123#"
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                    ...(!isEditing && {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderStyle: "dotted",
                      },
                    }),
                  }}
                />
                <Button onClick={handleEdit}>
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </Box>
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
              {history?.map((each) => (
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
