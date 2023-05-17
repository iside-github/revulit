import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { getSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { useEffect } from "react";
import { getCategoryHTML } from "redux-store/report/slice";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";
import { Box, Container, Stack } from "@mui/system";
import Lottie from "react-lottie";
import * as animationData from "./loader.json";
import { Card, Typography } from "@mui/material";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const category = useSelector((state) => state.report.category);
  const isLoading = useSelector((state) => state.report.isCategoryLoading);

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
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          {!isLoading ? (
            <Box sx={{ mb: 4 }}> {ReactHtmlParser(category)}</Box>
          ) : (
            <Card
              sx={{
                minHeight: "75vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
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
