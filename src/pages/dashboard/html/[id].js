import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { getSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import Head from "next/head";
import { useEffect } from "react";
import { getCategoryHTML } from "redux-store/report/slice";
import { useRouter } from "next/router";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

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
    <div>
      <p></p>
    </div>
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
