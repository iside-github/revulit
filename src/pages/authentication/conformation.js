import { useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { Box, Card, Container, Typography } from "@mui/material";
import { GuestGuard } from "../../components/authentication/guest-guard";
import { Logo } from "../../components/logo";
import { gtm } from "../../lib/gtm";
import SetConformation from "components/authentication/conformation-set";

const PasswordReset = () => {

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>User conformation | Revliterature</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          backgroundImage: "url(/static/bg.svg)",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: "60px",
              md: "120px",
            },
          }}
        >
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <NextLink href="/" passHref>
                <Logo
                  sx={{
                    height: 40,
                    width: 40,
                  }}
                />
              </NextLink>
              <Typography variant="h4">Accept invitation</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                To accept the invitation, you should set a password for your
                profile
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <SetConformation />
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

PasswordReset.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default PasswordReset;
