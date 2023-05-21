import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Checkbox,
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

export const ReportsTable = (props) => {
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
  const [category, setCategory] = useState([]);

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

  const enableBulkActions = selectedCustomers.length > 0;
  const selectedSomeCustomers =
    selectedCustomers.length > 0 && selectedCustomers.length < customers.length;
  const selectedAllCustomers = selectedCustomers.length === customers.length;

  function selectArrayWithLargestIndex(arrays) {
    let largestIndex = -1;
    let selectedArray = null;

    for (let i = 0; i < arrays.length; i++) {
      const currentArray = arrays[i];
      const lastIndex = currentArray.length - 1;

      if (lastIndex > largestIndex) {
        largestIndex = lastIndex;
        selectedArray = currentArray;
      }
    }

    return selectedArray;
  }

  useEffect(() => {
    const categories = customers.map((categ) => {
      if (categ?.categories) {
        return categ?.categories;
      } else {
        return [];
      }
    });

    const categorySelected = selectArrayWithLargestIndex(
      categories ? categories : []
    );
    setCategory(categorySelected ? categorySelected : []);
  }, [customers]);

  return (
    <div {...other}>
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
          display: enableBulkActions ? "block" : "none",
          px: 2,
          py: 0.5,
        }}
      >
        <Checkbox
          checked={selectedAllCustomers}
          indeterminate={selectedSomeCustomers}
          onChange={handleSelectAllCustomers}
        />
        <Button size="small" sx={{ ml: 2 }}>
          Delete
        </Button>
        <Button size="small" sx={{ ml: 2 }}>
          Edit
        </Button>
      </Box>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead
            sx={{ visibility: enableBulkActions ? "collapse" : "visible" }}
          >
            <TableRow>
              {/* <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAllCustomers}
                  indeterminate={selectedSomeCustomers}
                  onChange={handleSelectAllCustomers}
                />
              </TableCell> */}
              <TableCell>User</TableCell>
              <TableCell>Upload time</TableCell>
              <TableCell>File name</TableCell>
              {category?.map((cate, indx) => {
                return <TableCell key={indx}>{cate?.category_title}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => {
              const isCustomerSelected = selectedCustomers.includes(
                customer.id
              );

              return (
                <TableRow hover key={customer.id} selected={isCustomerSelected}>
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={isCustomerSelected}
                      onChange={(event) =>
                        handleSelectOneCustomer(event, customer.id)
                      }
                      value={isCustomerSelected}
                    />
                  </TableCell> */}
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Box
                        component="img"
                        alt="Profile image"
                        src={"/static/avatar.png"}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      />
                      <Box sx={{ ml: 1 }}>
                        <Typography color="textSecondary" variant="subtitle1">
                          {customer?.user?.name}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          {customer?.user?.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer?.createdAt
                      ? format(
                          new Date(customer?.createdAt),
                          "dd-MMM, yyyy HH:mm"
                        )
                      : ""}
                  </TableCell>
                  <TableCell>{customer?.file_name}</TableCell>
                  {customer?.categories?.map((cat) => {
                    return (
                      <TableCell key={cat?._id}>
                        <Typography
                          component="a"
                          href={`/dashboard/html/${cat?.category_id}?report=${customer?._id}&&categoryName=${cat?.category_title}`}
                          color="primary.main"
                          variant="subtitle2"
                          sx={{ textDecoration: "underline" }}
                        >
                          {cat?.category_count ? cat?.category_count : 0}
                        </Typography>
                      </TableCell>
                    );
                  })}
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

ReportsTable.propTypes = {
  customers: PropTypes.array.isRequired,
  customersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
