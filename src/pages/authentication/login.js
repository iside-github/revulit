import { useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Card, Container, Divider, Link, Typography } from "@mui/material";
import { GuestGuard } from "../../components/authentication/guest-guard";
import { JWTLogin } from "../../components/authentication/jwt-login";
import { Logo } from "../../components/logo";
import { gtm } from "../../lib/gtm";

const Login = () => {
  const router = useRouter();
  const { disableGuard } = router.query;

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Login | Revliterature</title>
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
              <Typography variant="h4">Log in</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                Welcome to RevLiterature
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <JWTLogin />
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ mt: 1 }}>
              <NextLink
                href={
                  disableGuard
                    ? `/authentication/password-recovery?disableGuard=${disableGuard}`
                    : "/authentication/password-recovery"
                }
                passHref
              >
                <Link color="textSecondary" variant="body2">
                  Forgot password ?
                </Link>
              </NextLink>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Login;
