import { useEffect, useState } from "react";
import Head from "next/head";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { Download as DownloadIcon } from "icons/download";
import { Reports as ReportsIcon } from "icons/reports";
import { gtm } from "lib/gtm";
import { FinanceOverview } from "components/dashboard/finance/finance-overview";
import { FinanceCostBreakdown } from "components/dashboard/finance/finance-cost-breakdown";
import { FinanceProfitableProducts } from "components/dashboard/finance/finance-profitable-products";
import { Cog as CogIcon } from "icons/cog";
import { FileDropzone } from "components/file-dropzone";
import { getSession } from "next-auth/react";
import { uploadFile } from "redux-store/file/upload";
import { useDispatch } from "react-redux";

const Overview = () => {
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
    // Restore the persistent state from local/session storage
    const value = globalThis.sessionStorage.getItem("dismiss-banner");

    if (value === "true") {
      // setDisplayBanner(false);
    }
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
                >
                  Reports
                </Button>
                <Button
                  startIcon={<CogIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="outlined"
                >
                  Settings
                </Button>
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
