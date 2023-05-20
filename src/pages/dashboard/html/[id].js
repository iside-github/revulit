import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { getSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getCategoryHTML } from "redux-store/report/slice";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";
import { Box, Container, Stack } from "@mui/system";
import Lottie from "react-lottie";
import * as animationData from "./loader.json";
import { Card, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LaunchIcon from "@mui/icons-material/Launch";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const category = useSelector((state) => state.report.category);
  const isLoading = useSelector((state) => state.report.isCategoryLoading);
  const [count, setCount] = useState();

  useEffect(() => {
    if (router?.query?.id) {
      dispatch(
        getCategoryHTML({
          category: router?.query?.id,
          id: router?.query?.report,
        })
      );
    }
  }, [router?.query?.id]);

  useEffect(() => {
    if (category && category?.length > 1) {
      const tableBody = document.querySelector("tbody");
      setCount(tableBody.childNodes.length);
      tableBody.childNodes.forEach((node, indx) => {
        node.childNodes[0].innerText = indx + 1;
      });
    }
  }, [category]);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
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
          pb: 8,
          pt: 4,
        }}
      >
        <Container maxWidth="xl">
          {!isLoading ? (
            <Box sx={{ mb: 4 }}>
              <Stack
                mb={3}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h4">
                  Result - {router?.query?.categoryName}
                </Typography>
                <LoadingButton
                  variant="contained"
                  startIcon={<LaunchIcon />}
                  component="a"
                  href={`/api/user/download-reports/${router?.query?.report}?category=${router?.query?.id}`}
                  download
                >
                  Export to csv
                </LoadingButton>
              </Stack>
              <Stack>{ReactHtmlParser(category)}</Stack>
            </Box>
          ) : (
            <Card
              sx={{
                minHeight: "75vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "none",
                boxShadow: "none",
              }}
            >
              <Lottie options={defaultOptions} height={400} width={400} />
              <Stack>
                <Typography variant="body1">Report is loading...</Typography>
              </Stack>
            </Card>
          )}
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
        destination: "/authentication/login?returnUrl=/dashboard",
      },
    };
  }
  return {
    props: { session },
  };
};
