import { useEffect, useState } from "react";
import NextLink from "next/link";
import numeral from "numeral";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "components/scrollbar";
import { format } from "date-fns";
import { Stack } from "@mui/system";

export const CompanyListTable = (props) => {
  const {
    customers = [],
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
      event.target.checked ? customers.map((customer) => customer.id) : []
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
    <Stack my={2}>
      <div {...other}>
        <Scrollbar>
          <Table sx={{ minWidth: 700 }}>
            <TableHead
              sx={{ visibility: enableBulkActions ? "collapse" : "visible" }}
            >
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Users count</TableCell>
                <TableCell>Uploaded files</TableCell>
                <TableCell align="right">Company created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => {
                const isCustomerSelected = selectedCustomers.includes(
                  customer.id
                );

                return (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={isCustomerSelected}
                  >
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
                          <NextLink href="/dashboard/customers/1" passHref>
                            <Link color="inherit" variant="subtitle2">
                              {customer.name}
                            </Link>
                          </NextLink>
                          <Typography color="textSecondary" variant="body2">
                            {customer.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>Iside</TableCell>
                    <TableCell>{customer.totalOrders}</TableCell>
                    <TableCell>
                      <Typography
                        color={
                          customer?.isBlock ? "error.main" : "success.main"
                        }
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
    </Stack>
  );
};

CompanyListTable.propTypes = {
  customers: PropTypes.array.isRequired,
  customersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
