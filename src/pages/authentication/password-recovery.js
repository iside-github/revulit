import { useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { Box, Card, Container, Typography } from "@mui/material";
import { GuestGuard } from "../../components/authentication/guest-guard";
import { AmplifyPasswordRecovery } from "../../components/authentication/amplify-password-recovery";
import { Logo } from "../../components/logo";
import { gtm } from "../../lib/gtm";

const PasswordRecovery = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Password Recovery | Revliterature</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          display: "flex",
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
              <Typography variant="h4">Password Recovery</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                Tell us your email so we can send you a reset link
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <AmplifyPasswordRecovery />
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

PasswordRecovery.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default PasswordRecovery;
