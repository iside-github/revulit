import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../scrollbar";
import { format } from "date-fns";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export const CustomerListTable = (props) => {
  const {
    customers,
    customersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  // Reset selected customers when customers change
  useEffect(
    () => {
      if (selectedCustomers.length) {
        setSelectedCustomers([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customers]
  );

  const handleSelectAllCustomers = (event) => {
    setSelectedCustomers(
      event.target.checked ? customers?.map((customer) => customer.id) : []
    );
  };

  const handleSelectOneCustomer = (event, customerId) => {
    if (!selectedCustomers.includes(customerId)) {
      setSelectedCustomers((prevSelected) => [...prevSelected, customerId]);
    } else {
      setSelectedCustomers((prevSelected) =>
        prevSelected.filter((id) => id !== customerId)
      );
    }
  };

  const enableBulkActions = selectedCustomers.length > 0;
  const selectedSomeCustomers =
    selectedCustomers.length > 0 && selectedCustomers.length < customers.length;
  const selectedAllCustomers = selectedCustomers.length === customers.length;

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead
            sx={{ visibility: enableBulkActions ? "collapse" : "visible" }}
          >
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Uploaded files</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Joined</TableCell>
              <TableCell align="right">Block/Unblock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers?.map((customer) => {
              const isCustomerSelected = selectedCustomers.includes(
                customer.id
              );

              return (
                <TableRow hover key={customer.id} selected={isCustomerSelected}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar
                        src={"/static/avatar.png"}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      />
                      <Box sx={{ ml: 1 }}>
                        <Typography color="textSecondary" variant="subtitle1">
                          {customer.name}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          {customer.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{customer?.company}</TableCell>
                  <TableCell>{customer?.reportCount}</TableCell>
                  <TableCell>
                    <Typography
                      color={customer?.isBlock ? "error.main" : "success.main"}
                      variant="subtitle2"
                    >
                      {customer?.isBlock ? "Blocked" : "Active"}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {customer?.createdAt
                      ? format(
                          new Date(customer?.createdAt),
                          "dd-MMM, yyyy HH:mm"
                        )
                      : ""}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() =>
                        props.block(customer?.isBlock, customer?._id)
                      }
                      sx={{ borderRadius: "50%" }}
                    >
                      {customer?.isBlock ? (
                        <LockOutlinedIcon />
                      ) : (
                        <LockOpenOutlinedIcon />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={customersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

CustomerListTable.propTypes = {
  customers: PropTypes.array.isRequired,
  customersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
