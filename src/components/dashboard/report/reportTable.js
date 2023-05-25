import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
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
import TableSortLabel from "@mui/material/TableSortLabel";

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
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <div {...other}>
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
              <TableCell sortDirection={orderBy === "name" ? order : false}>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : false}
                  onClick={createSortHandler("name")}
                >
                  User
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "name" ? order : false}>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : false}
                  onClick={createSortHandler("name")}
                >
                  Uploaded time
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "name" ? order : false}>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : false}
                  onClick={createSortHandler("name")}
                >
                  File name
                </TableSortLabel>
              </TableCell>
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
                  <TableCell>
                    <Typography
                      component="a"
                      href={`/static/uploads/files/${customer?.file_src}`}
                      target="_blank"
                      sx={{ textDecoration: "underline" }}
                    >
                      {customer?.file_name}
                    </Typography>
                  </TableCell>
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
