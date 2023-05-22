import { useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { Box, Card, Container, Divider, Typography } from "@mui/material";
import { GuestGuard } from "../../components/authentication/guest-guard";
import { AmplifyPasswordReset } from "../../components/authentication/amplify-password-reset";
import { Logo } from "../../components/logo";
import { gtm } from "../../lib/gtm";

const PasswordReset = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Password Reset | Revliterature</title>
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
              <Typography variant="h4">Password Reset</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                Reset your account password using your code
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <AmplifyPasswordReset />
            </Box>
            <Divider sx={{ my: 3 }} />
          </Card>
        </Container>
      </Box>
    </>
  );
};

PasswordReset.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default PasswordReset;
