import { useEffect } from "react";
import Head from "next/head";
import { Divider } from "@mui/material";
import { MainLayout } from "../components/main-layout";
import { HomeHero } from "../components/home/home-hero";
import { HomeDevelopers } from "../components/home/home-developers";
import { gtm } from "../lib/gtm";
import { GuestGuard } from "components/authentication/guest-guard";

const Home = () => {
    useEffect(() => {
        gtm.push({ event: 'page_view' });
    }, []);

    return (
        <>
            <Head>
                <title>Revliterature</title>
            </Head>
            <main>
                <HomeHero />
                <Divider />
                <HomeDevelopers />
                <Divider />
            </main>
        </>
    );
};

Home.getLayout = (page) => (
  <GuestGuard>
    <MainLayout>{page}</MainLayout>
  </GuestGuard>
);

export default Home;
