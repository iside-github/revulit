import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
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
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getCompaniesList } from "redux-store/company/index.slice";

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

  const enableBulkActions = selectedCustomers.length > 0;
  const dispatch = useDispatch();

  const handleBlockUnblock = async (status, id) => {
    const data = new FormData();
    data.append("isBlock", !status);
    try {
      await axios({
        method: "POST",
        url: `/api/admin/company/update-company/${id}`,
        data,
      });
      dispatch(getCompaniesList());
      toast.success("Action completed");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Unexpected error. Try again later"
      );
    }
  };

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
                <TableCell>Status</TableCell>
                <TableCell align="right">Company created</TableCell>
                <TableCell align="right">Block/unblock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers?.map((customer) => {
                return (
                  <TableRow hover key={customer.id}>
                    <TableCell>#{customer?.uid}</TableCell>
                    <TableCell>
                      <Stack>
                        <Typography variant="body2">
                          {customer?.name}
                        </Typography>
                        <Typography variant="caption">
                          {customer?.email}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer?.userCount}</TableCell>
                    <TableCell>{customer?.repoCount}</TableCell>
                    <TableCell>
                      <Typography
                        color={
                          customer?.isBlock ? "error.main" : "primary.main"
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
                    <TableCell align="right">
                      <IconButton
                        onClick={() =>
                          handleBlockUnblock(customer?.isBlock, customer?._id)
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
