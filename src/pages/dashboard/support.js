import {
  Box,
  Button,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { getSession } from "next-auth/react";
import Head from "next/head";

const Support = () => {
  return (
    <>
      <Head>
        <title>Support | Revleterature</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Documentation
            </Typography>

            <Typography variant="h6">1. Getting Started</Typography>
            <Typography paragraph>
              <strong>System Requirements</strong>
              <br />
              To use the AI Website for CSV generation, ensure that your system
              meets the following requirements:
              <ul>
                <li>
                  Modern web browser (e.g., Google Chrome, Mozilla Firefox,
                  Safari)
                </li>
                <li>Stable internet connection</li>
              </ul>
            </Typography>
            <Typography paragraph>
              <strong>Installation</strong>
              <br />
              The AI Website does not require any installation as it is a
              web-based application. Simply access the website through the
              provided URL.
            </Typography>

            <Typography variant="h6">2. Features</Typography>
            <Typography paragraph>
              <strong>File Upload</strong>
              <br />
              The AI Website allows users to upload various file formats,
              including documents, spreadsheets, and images. The uploaded files
              serve as input data for the AI algorithms.
            </Typography>
            <Typography paragraph>
              <strong>AI Processing</strong>
              <br />
              Once a file is uploaded, the website utilizes advanced artificial
              intelligence algorithms to analyze and process the data within the
              file. The algorithms extract relevant information and structure it
              appropriately for CSV generation.
            </Typography>
            <Typography paragraph>
              <strong>CSV Generation</strong>
              <br />
              Based on the processed data, the AI Website generates a CSV file
              containing the extracted information. The CSV file is formatted
              with comma-separated values, making it compatible with a wide
              range of applications and platforms.
            </Typography>

            {/* Rest of the report content */}
            <Typography variant="h5" gutterBottom>
              Fore detailed instruction, watch attched video
            </Typography>
            <Stack>
              <iframe
                width="100%"
                height="615"
                src="https://www.youtube.com/embed/KJwYBJMSbPI"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Support.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Support;

