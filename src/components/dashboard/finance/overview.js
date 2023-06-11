import { Stack } from "@mui/system";
import { Chart } from "../../chart";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Field, reduxForm } from "redux-form";
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyOverViewStats } from "redux-store/report/slice";
import { useEffect } from "react";
import { format } from "date-fns";

const CompanyOverCiew = ({ handleSubmit }) => {
  var options = {
    series: [
      {
        name: "Marine Sprite",
        data: [44, 55, 41, 37, 22, 43, 21],
      },
      {
        name: "Striking Calf",
        data: [53, 32, 33, 52, 13, 43, 32],
      },
      {
        name: "Tank Picture",
        data: [12, 17, 11, 9, 15, 11, 20],
      },
      {
        name: "Bucket Slope",
        data: [9, 7, 5, 8, 6, 9, 4],
      },
      {
        name: "Reborn Kid",
        data: [25, 12, 19, 32, 25, 24, 10],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "Fiction Books Sales",
      },
      xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        labels: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  };

  const dispatch = useDispatch();
  const isOverviewLoading = useSelector(
    (state) => state.report.isOverviewLoading
  );
  const categories = useSelector((state) => state.category.list);
  const overviewList = useSelector((state) => state.report.overview);

  useEffect(() => {
    dispatch(getCompanyOverViewStats());
  }, []);

  const getDataForGraph = () => {
    let list = overviewList ? [...overviewList] : [];
    const rArray = [];
    categories?.forEach((cat) => {
      const itemOBJ = {};
      itemOBJ["name"] = cat?.category_title;
      const itemValues = [];
      list?.forEach((item) => {
        itemValues.push(item?.statistics[cat?.category_id] ? item?.statistics[cat?.category_id] : 0)
      });
      itemOBJ["data"] = itemValues;
      rArray.push(itemOBJ);
    });
    return rArray;
  };

  const getDays = () => {
    const daysList = [];
    let list = overviewList ? [...overviewList] : [];
    list?.forEach((item) => {
      daysList.push(format(new Date(item?.day), "dd"));
    });
    return daysList;
  };

  const handleDateFilter = (values) => {
    dispatch(
      getCompanyOverViewStats({
        startTime: values?.startTime?.toISOString(),
        endTime: values?.endTime?.toISOString(),
      })
    );
  };

  const CustomDatePicker = ({ label, input, classes, meta, ...custom }) => {
    return (
      <DatePicker
        label={label}
        placeholder={label}
        {...input}
        {...custom}
        slotProps={{
          textField: {
            fullWidth: true,
            size: "small",
            helperText: meta.touched ? meta.error : null,
            error: meta.touched ? meta.invalid : null,
          },
        }}
      />
    );
  };

  return (
    <Stack>
      <Stack direction={"row"} p={2} justifyContent="flex-end" gap={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Field
              component={CustomDatePicker}
              label="Start time"
              name="startTime"
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <Field
              component={CustomDatePicker}
              label="End time"
              name="endTime"
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <LoadingButton
              loading={isOverviewLoading}
              onClick={handleSubmit(handleDateFilter)}
              sx={{ width: "100%" }}
              variant="contained"
            >
              Filter
            </LoadingButton>
          </Grid>
        </Grid>
      </Stack>
      <div id="chart">
        <Chart
          type="bar"
          height={560}
          series={getDataForGraph()}
          options={{
            title: {
              text: "By default last 10 days statistics are shown",
            },
            chart: {
              stacked: true,
              type: "bar",
            },
            xaxis: {
              title: { text: "Days" },
              categories: getDays(),
            },
            yaxis: {
              title: { text: "Articles count" },
            },
            legend: {
              position: "top"
            },
            dataLabels: {
              enabled: true
            }
          }}
        />
      </div>
    </Stack>
  );
};

function validate(values) {
  let errors = {};
  const requiredFields = ["startTime", "endTime"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Field is required!";
    }
  });
  return errors;
}

export default reduxForm({
  form: "company_overview",
  validate,
})(CompanyOverCiew);
