import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { getSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { useEffect } from "react";
import { getCategoryHTML } from "redux-store/report/slice";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";
import { Box, Container } from "@mui/system";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const category = useSelector((state) => state.report.category);

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
          <Box sx={{ mb: 4 }}> {ReactHtmlParser(category)}</Box>
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
