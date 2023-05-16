import { useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { Box, Card, Container, Typography } from "@mui/material";
import { GuestGuard } from "../../components/authentication/guest-guard";
import { Logo } from "../../components/logo";
import { gtm } from "../../lib/gtm";
import Lottie from "react-lottie";
import * as animationData from "./auth.json";

const RecoverySuccess = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);
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
        <title>Password Recovery | Revliterature</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          backgroundImage: "url(/static/bg.svg)",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
            <Typography variant="h4">Password recovery sent</Typography>
            <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
              We have sent you a reset link to your email. Please, check your
              email!
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              mt: 3,
            }}
          >
            <Lottie options={defaultOptions} height={400} width={400} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

RecoverySuccess.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default RecoverySuccess;
