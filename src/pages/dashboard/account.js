import { useEffect, useState } from "react";
import Head from "next/head";
import { Box, Container, Divider, Tab, Tabs, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import { AccountGeneralSettings } from "../../components/dashboard/account/account-general-settings";
import { AccountNotificationsSettings } from "../../components/dashboard/account/account-notifications-settings";
import AccountSecuritySettings from "../../components/dashboard/account/account-security-settings";
import { gtm } from "../../lib/gtm";
import { getSession } from "next-auth/react";

const tabs = [
  { label: "General", value: "general" },
  { label: "Notifications", value: "notifications" },
  { label: "Security", value: "security" },
];

const Account = () => {
  const [currentTab, setCurrentTab] = useState("general");

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
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
        <Container maxWidth="md">
          <Typography variant="h4">Account</Typography>
          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="primary"
            value={currentTab}
            variant="scrollable"
            sx={{ mt: 3 }}
          >
            {tabs?.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
          <Divider sx={{ mb: 3 }} />
          {currentTab === "general" && <AccountGeneralSettings />}
          {currentTab === "notifications" && <AccountNotificationsSettings />}
          {currentTab === "security" && <AccountSecuritySettings />}
        </Container>
      </Box>
    </>
  );
};

Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Account;

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
