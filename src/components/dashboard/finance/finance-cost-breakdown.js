import numeral from "numeral";
import {
  Box,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Chart } from "../../chart";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const colorCodes = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#E7E9ED",
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#E7E9ED",
  "#FF6384",
];

export const FinanceCostBreakdown = (props) => {
  const theme = useTheme();
  const [data, setData] = useState({ series: [] });
  const categories = useSelector((state) => state.category.list);
  const stats = useSelector((state) => state.report.statistics);

  const generateReportData = () => {
    const filteredCategories = categories?.filter(
      (item) => item?.category_id !== "total"
    );
    let dataObj = {};
    const seriesList = [];

    filteredCategories?.forEach((element, indx) => {
      const arrayItem = {};
      arrayItem["color"] = colorCodes[indx];
      if (stats && element?.category_id && stats[element?.category_id]) {
        arrayItem["data"] = stats[element?.category_id];
      } else {
        arrayItem["data"] = 0;
      }
      arrayItem["label"] = element?.category_title;
      seriesList.push(arrayItem);
    });

    dataObj["series"] = seriesList;

    setData(dataObj);
  };

  useEffect(() => {
    generateReportData();
  }, [stats, categories]);

  const chartOptions = {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: data.series.map((item) => item.color),
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    labels: data.series.map((item) => item.label),
    legend: {
      show: false,
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
  };

  const chartSeries = data.series.map((item) => item.data);

  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        p={2}
      >
        <DatePicker
          value={props.date}
          onChange={(newValue) => props.setDate(newValue)}
        />
      </Stack>
      <CardContent>
        <Chart
          height={440}
          options={chartOptions}
          series={chartSeries}
          type="pie"
        />
      </CardContent>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Categories</TableCell>
            <TableCell align="right">Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.series.map((item) => (
            <TableRow key={item.label}>
              <TableCell>
                <Box
                  key={item.label}
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      border: 3,
                      borderColor: item.color,
                      borderRadius: "50%",
                      height: 16,
                      mr: 1,
                      width: 16,
                    }}
                  />
                  <Typography variant="subtitle2">{item.label}</Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="body2">
                  {item?.data?.toLocaleString()} articles
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
};
