import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { ReportsTable } from "components/dashboard/report/reportTable";
import { Download as DownloadIcon } from "../../../icons/download";
import { Search as SearchIcon } from "../../../icons/search";
import { gtm } from "../../../lib/gtm";
import { getSession } from "next-auth/react";
import { getCompanyReports } from "redux-store/report/slice";
import { useDispatch, useSelector } from "react-redux";
import download_table_as_csv from "utils/exporter";

const sortOptions = [
  {
    label: "A-Z",
    value: "updatedAt|desc",
  },
  {
    label: "Z-A",
    value: "updatedAt|asc",
  },
  {
    label: "Old to new",
    value: "totalOrders|desc",
  },
  {
    label: "New to old",
    value: "totalOrders|asc",
  },
];

const applyFilters = (customers, filters) =>
  customers.filter((customer) => {
    if (filters.query) {
      let queryMatched = false;
      const properties = ["email", "name"];

      properties.forEach((property) => {
        if (
          customer[property].toLowerCase().includes(filters.query.toLowerCase())
        ) {
          queryMatched = true;
        }
      });

      if (!queryMatched) {
        return false;
      }
    }

    if (filters.hasAcceptedMarketing && !customer.hasAcceptedMarketing) {
      return false;
    }

    if (filters.isProspect && !customer.isProspect) {
      return false;
    }

    if (filters.isReturning && !customer.isReturning) {
      return false;
    }

    return true;
  });

const descendingComparator = (a, b, sortBy) => {
  // When compared to something undefined, always returns false.
  // This means that if a field does not exist from either element ('a' or 'b') the return will be 0.

  if (b[sortBy] < a[sortBy]) {
    return -1;
  }

  if (b[sortBy] > a[sortBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (sortDir, sortBy) =>
  sortDir === "desc"
    ? (a, b) => descendingComparator(a, b, sortBy)
    : (a, b) => -descendingComparator(a, b, sortBy);

const applySort = (customers, sort) => {
  const [sortBy, sortDir] = sort.split("|");
  const comparator = getComparator(sortDir, sortBy);
  const stabilizedThis = customers.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};

const applyPagination = (customers, page, rowsPerPage) =>
  customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const ReportsPage = () => {
  const reports = useSelector((state) => state.report.list);
  const queryRef = useRef(null);
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    query: "",
    hasAcceptedMarketing: undefined,
    isProspect: undefined,
    isReturning: undefined,
  });

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(getCompanyReports());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleQueryChange = (event) => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      query: queryRef.current?.value,
    }));
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredCustomers = applyFilters(reports, filters);
  const sortedCustomers = applySort(filteredCustomers, sort);
  const paginatedCustomers = applyPagination(
    sortedCustomers,
    page,
    rowsPerPage
  );

  return (
    <>
      <Head>
        <title>Dashboard: Reports | Revliterature</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 2 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Reports</Typography>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<DownloadIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="contained"
                >
                  Export
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Card>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                m: -1.5,
                p: 3,
              }}
            >
              <Box
                component="form"
                onSubmit={handleQueryChange}
                sx={{
                  flexGrow: 1,
                  m: 1.5,
                }}
              >
                <TextField
                  defaultValue=""
                  fullWidth
                  inputProps={{ ref: queryRef }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search reoports by email"
                />
              </Box>
              <TextField
                label="Sort By"
                name="sort"
                onChange={handleSortChange}
                select
                SelectProps={{ native: true }}
                sx={{ m: 1.5 }}
                value={sort}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Box>
            <ReportsTable
              customers={paginatedCustomers}
              customersCount={filteredCustomers.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

ReportsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ReportsPage;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/authentication/login?returnUrl=/dashboard",
      },
    };
  }
  return {
    props: { session },
  };
};
