import numeral from "numeral";
import { Box, Card, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Chart } from "../../chart";

const ChartLine = () => {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: "transparent",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#2F3EB1"],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    grid: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  const chartSeries = [{ data: [256, 282, 221, 245, 235, 274, 234, 256] }];

  return <Chart options={chartOptions} series={chartSeries} type="area" />;
};

const data = {
  sales: {
    actualYear: 152996,
    lastYear: 121420,
  },
  profit: {
    actualYear: 32100,
    lastYear: 25200,
  },
  cost: {
    actualYear: 99700,
    lastYear: 68300,
  },
};

export const FinanceOverview = (props) => {
  return (
    <Grid container spacing={1}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <Grid item md={3} xs={12} key={item}>
          <Card
            {...props}
            sx={{
              borderRight: (theme) => ({
                md: `1px solid ${theme.palette.divider}`,
              }),
              borderBottom: (theme) => ({
                md: "none",
                xs: `1px solid ${theme.palette.divider}`,
              }),
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <div>
              <Typography color="textSecondary" variant="overline">
                Category 1
              </Typography>
              <Typography variant="h5" textAlign="center">
                120
              </Typography>
              <Typography color="textSecondary" variant="body2">
                Total articles
              </Typography>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
