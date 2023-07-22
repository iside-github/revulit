import { Container, Stack } from "@mui/system";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import CreateCompany from "components/superadmin/create-company";
import CreateUser from "components/superadmin/create-user";
import { CompanyListTable } from "components/superadmin/CompanyList";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCompaniesList } from "redux-store/company/index.slice";
import LoaderComponent from "components/dashboard/bindings/loader";
import EmptyComponent from "components/dashboard/bindings/empty";

const sortOptions = [
  {
    label: "A-Z",
    value: "updatedAt|desc",
  },
  {
    label: "Z-A",
    value: "updatedAt|asc",
  },
];

const applyFilters = (customers, filters) =>
  customers?.filter((customer) => {
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
  const stabilizedThis = customers??.map((el, index) => [el, index]);

  stabilizedThis?.sort((a, b) => {
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    return a[1] - b[1];
  });

  return stabilizedThis??.map((el) => el[0])
    ? stabilizedThis??.map((el) => el[0])
    : [];
};

const applyPagination = (customers, page, rowsPerPage) =>
  customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Page = () => {
  const [value, setValue] = React.useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(sortOptions[0].value);

  const [filters, setFilters] = useState({
    query: "",
    hasAcceptedMarketing: undefined,
    isProspect: undefined,
    isReturning: undefined,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const companiesList = useSelector((state) => state.company.list);
  const isListLoading = useSelector((state) => state.company.isListLoading);

  useEffect(() => {
    dispatch(getCompaniesList());
  }, []);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredCustomers = applyFilters(companiesList, filters);
  const sortedCustomers = applySort(filteredCustomers, sort);
  const paginatedCustomers = applyPagination(
    sortedCustomers,
    page,
    rowsPerPage
  );

  return (
    <>
      <Head>
        <title>Adminstrator | Revliterature</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container>
          <Stack mb={2}>
            <Typography variant="h4">Adminstrator</Typography>
          </Stack>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Companies" {...a11yProps(0)} />
              <Tab label="Create company" {...a11yProps(1)} />
              <Tab label="Create user" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {!isListLoading && paginatedCustomers?.length > 0 ? (
              <Card sx={{ px: 2, py: 1 }}>
                <CompanyListTable
                  customers={paginatedCustomers}
                  customersCount={filteredCustomers?.length}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  rowsPerPage={rowsPerPage}
                  page={page}
                />
              </Card>
            ) : isListLoading ? (
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
                <EmptyComponent text="You have not created a company yet" />
              </Card>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Card sx={{ px: 2, py: 3 }}>
              <CreateCompany />
            </Card>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Card sx={{ px: 2, py: 3 }}>
              <CreateUser />
            </Card>
          </TabPanel>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/authentication/login?returnUrl=/dashboard/superadmin",
      },
    };
  }
  return {
    props: { session },
  };
};
