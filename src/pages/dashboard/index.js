import { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { Download as DownloadIcon } from "icons/download";
import { Reports as ReportsIcon } from "icons/reports";
import { gtm } from "lib/gtm";
import { FinanceOverview } from "components/dashboard/finance/finance-overview";
import { FinanceCostBreakdown } from "components/dashboard/finance/finance-cost-breakdown";
import { FinanceProfitableProducts } from "components/dashboard/finance/finance-profitable-products";
import { FileDropzone } from "components/file-dropzone";
import { getSession } from "next-auth/react";
import { uploadFile } from "redux-store/file/upload";
import { useDispatch, useSelector } from "react-redux";
import { getRecentlyUploadedReports } from "redux-store/report/slice";

const Overview = () => {
  const fileData = useSelector((state) => state.file.data);
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);

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
  }, []);

  const handleUploadFile = () => {
    const data = new FormData();
    data.append("file", files[0]);
    dispatch(uploadFile(data));
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
          py: 8,
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
                accept={{
                  "image/*": [],
                }}
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
              <FinanceCostBreakdown />
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
