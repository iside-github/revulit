import { Stack, Grid } from "@mui/system";
import { getSession } from "next-auth/react";

const Page = () => {
  return (
    <Stack>
      <Grid></Grid>
    </Stack>
  );
};

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
