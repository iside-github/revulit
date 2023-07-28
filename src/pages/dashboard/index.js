import { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { Download as DownloadIcon } from "icons/download";
import { Reports as ReportsIcon } from "icons/reports";
import { gtm } from "lib/gtm";
import { FinanceOverview } from "components/dashboard/finance/finance-overview";
import { FinanceCostBreakdown } from "components/dashboard/finance/finance-cost-breakdown";
import { FinanceProfitableProducts } from "components/dashboard/finance/finance-profitable-products";
import { FileDropzone } from "components/file-dropzone";
import { uploadFile } from "redux-store/file/upload";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecentlyUploadedReports,
  getTotalStatistics,
} from "redux-store/report/slice";
import { getCategories } from "redux-store/category/index.slice";
import CompanyOverCiew from "components/dashboard/finance/overview";


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
      {value === index && <Box>{children}</Box>}
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

const Overview = () => {
  const fileData = useSelector((state) => state.file.data);
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [date, setDate] = useState(undefined);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDrop = (newFiles) => {
    setFiles((prevFiles) => [...newFiles]);
  };
  const handleRemove = (file) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_file) => _file.path !== file.path)
    );
  };

  const handleRemoveAll = () => {
    setFiles([]);
  };
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    dispatch(getRecentlyUploadedReports());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(
      getTotalStatistics({ filter: date?.toISOString(), personal: true })
    );
  }, [date]);

  const update = () => {
    dispatch(getRecentlyUploadedReports());
  };

  const handleUploadFile = () => {
    const data = new FormData();
    data.append("file", files[0]);
    dispatch(uploadFile({ data, update }));
  };

  return (
    <>
      <Head>
        <title>Revliterature</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container>
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Dashboard</Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  m: -1,
                }}
              >
                <Button
                  startIcon={<ReportsIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="outlined"
                  component="a"
                  href="/dashboard/report"
                >
                  Reports
                </Button>
                <Tooltip title="It takes up to 10 seconds to download the report as csv">
                  <Button
                    startIcon={<DownloadIcon fontSize="small" />}
                    sx={{ m: 1 }}
                    variant="contained"
                    disabled={!fileData?.total}
                    component="a"
                    href={`/api/user/download-reports/${fileData?.id}?category=total`}
                    download
                  >
                    Export
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <FileDropzone
                // accept={{
                //     'text/csv': ["xlsx"],
                //     'text/xlsx': [],
                //     'text/xlsm': [],
                //     'text/xltx': [],
                //     'text/XLSX': [],
                // }}
                files={files}
                onDrop={handleDrop}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}
                maxFiles={1}
                onUpload={handleUploadFile}
              />
            </Grid>
            <Grid item xs={12}>
              <FinanceOverview />
            </Grid>
            <Grid item xs={12}>
              <Card>
                <Stack p={2}>
                  <Typography color={"textSecondary"} variant="h5">
                    Uploads statistics
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    px: 2,
                  }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="User statistics" {...a11yProps(0)} />
                    <Tab label="Company overview" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <FinanceCostBreakdown
                    value={value}
                    personal={true}
                    date={date}
                    setDate={setDate}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <CompanyOverCiew date={date} setDate={setDate} />
                </TabPanel>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <FinanceProfitableProducts />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Overview.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Overview;


