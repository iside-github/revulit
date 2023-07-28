import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { Download as DownloadIcon } from "../../../icons/download";
import { Search as SearchIcon } from "../../../icons/search";
import { gtm } from "../../../lib/gtm";
import { getSession } from "next-auth/react";
import { getCompanyReports } from "redux-store/report/slice";
import { useDispatch, useSelector } from "react-redux";
import LoaderComponent from "components/dashboard/bindings/loader";
import EmptyComponent from "components/dashboard/bindings/empty";
import Link from "next/link";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getCategories } from "redux-store/category/index.slice";
import { format } from "date-fns";
import { Stack } from "@mui/system";

const applyFilters = (customers, filters) =>
  customers.filter((customer) => {
    if (filters.query) {
      let queryMatched = false;
      const properties = ["email", "name"];

      properties.forEach((property) => {
        if (
          customer["user"][property]
            .toLowerCase()
            .includes(filters.query.toLowerCase())
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
  const stabilizedThis = customers?.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    return a[1] - b[1];
  });

  return stabilizedThis?.map((el) => el[0]);
};

const ReportsPage = () => {
  const reports = useSelector((state) => state.report.list);
  const catis = useSelector((state) => state.category.list);
  const isLoading = useSelector((state) => state.report.isLoading);
  const queryRef = useRef(null);
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
      dispatch(getCategories());
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

  // Usually query is done on backend with indexing solutions
  const filteredCustomers = applyFilters(reports, filters);

  const generateColumns = () => {
    const cols = [
      {
        field: "user",
        headerName: "User",
        width: 280,
        renderCell: (cellValues) => {
          console.log(cellValues);
          return (
            <Stack direction="row" alignItems="center" gap={2}>
              <Avatar src="/static/avatar.png" />
              <Stack>
                <Typography color="textSecondary" variant="subtitle1">
                  {cellValues?.formattedValue?.name}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  {cellValues?.formattedValue?.email}
                </Typography>
              </Stack>
            </Stack>
          );
        },
      },
      {
        field: "createdAt",
        headerName: "Upload time",
        width: 170,
      },
      {
        field: "file_name",
        headerName: "File name",
        width: 250,
      },
      {
        field: "total",
        headerName: "Total",
        type: "number",
        width: 120,
        renderCell: (cellValues) => {
          return (
            <Typography
              component="a"
              href={`/dashboard/html/total?report=${cellValues?.id}&&categoryName=Total`}
              color="primary.main"
              variant="subtitle2"
              sx={{ textDecoration: "underline" }}
            >
              {cellValues?.formattedValue ? cellValues?.formattedValue : 0}
            </Typography>
          );
        },
      },
    ];
    catis?.forEach((item) => {
      cols.push({
        field: item?.category_id,
        headerName: item?.category_title,
        type: "number",
        width: 120,
        renderCell: (cellValues) => {
          return (
            <Typography
              component="a"
              href={`/dashboard/html/${item?.category_id}?report=${cellValues?.id}&&categoryName=${item?.category_title}`}
              color="primary.main"
              variant="subtitle2"
              sx={{ textDecoration: "underline" }}
            >
              {cellValues?.formattedValue ? cellValues?.formattedValue : 0}
            </Typography>
          );
        },
      });
    });
    return cols;
  };

  const generateRows = () => {
    const rws = [];
    let fsCusts = filteredCustomers ? [...filteredCustomers] : [];
    fsCusts?.forEach((item) => {
      const oBJ = {
        id: item?._id,
        user: item?.user,
        createdAt: item?.createdAt
          ? format(new Date(item?.createdAt), "dd-MMM, yyyy HH:mm")
          : "",
        file_name: item?.file_name,
        total: item?.categories?.find((item) => item?.category_id === "total")
          ?.category_count
          ? item?.categories?.find((item) => item?.category_id === "total")
              ?.category_count
          : 0,
      };
      catis?.forEach((item2) => {
        oBJ[item2?.category_id] = item?.categories?.find(
          (item) => item?.category_id === item2?.category_id
        )?.category_count
          ? item?.categories?.find(
              (item) => item?.category_id === item2?.category_id
            )?.category_count
          : 0;
      });
      rws.push(oBJ);
    });
    return rws;
  };

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
              <Grid item></Grid>
            </Grid>
          </Box>
          {!isLoading && reports?.length ? (
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
              </Box>
              <Divider />
              <DataGrid
                slots={{
                  toolbar: GridToolbar,
                }}
                rows={generateRows()}
                columns={generateColumns()}
                pageSize={10}
                rowsPerPageOptions={[5, 6, 7, 10]}
              />
            </Card>
          ) : isLoading ? (
            <Card
              sx={{
                minHeight: "70vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LoaderComponent />
            </Card>
          ) : (
            <Card
              sx={{
                minHeight: "70vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EmptyComponent text="Company does not have reports yet" />
            </Card>
          )}
        </Container>
      </Box>
    </>
  );
};

ReportsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ReportsPage;

