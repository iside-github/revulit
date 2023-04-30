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

export const AccountSecuritySettings = () => {
  const [isEditing, setIsEditing] = useState(false);

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
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2">Credentials login</Typography>
                  <Typography variant="body2" color="body2">
                    on 10:40 AM 2021/09/01
                  </Typography>
                </TableCell>
                <TableCell>95.130.17.84</TableCell>
                <TableCell>Chrome, Mac OS 10.15.7</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2">Credentials login</Typography>
                  <Typography color="body2" variant="body2">
                    on 10:40 AM 2021/09/01
                  </Typography>
                </TableCell>
                <TableCell>95.130.17.84</TableCell>
                <TableCell>Chrome, Mac OS 10.15.7</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Scrollbar>
      </Card>
    </>
  );
};
