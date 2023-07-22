import { Card, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export const FinanceOverview = (props) => {
  const router = useRouter();
  const fileData = useSelector((state) => state.file.data);
  const result = [
    {
      id: 1,
      title: "Total",
      value: fileData?.total ? fileData?.total : 0,
      category: "total",
    },
    {
      id: 11,
      title: "ICSR",
      value: fileData?.ICSR ? fileData?.ICSR : 0,
      category: "ICSR",
    },
    {
      id: 12,
      title: "Composite",
      value: fileData?.composite ? fileData?.composite : 0,
      category: "composite",
    },
    {
      id: 13,
      title: "Manual Review",
      value: fileData?.manual_review ? fileData?.manual_review : 0,
      category: "manual_review",
    },
    {
      id: 14,
      title: "Safety",
      value: fileData?.safety ? fileData?.safety : 0,
      category: "safety",
    },
    {
      id: 15,
      title: "Non relevant",
      value: fileData?.non_relevant ? fileData?.non_relevant : 0,
      category: "non_relevant",
    },
  ];
  const restCats = fileData?.categories;
  const existCats = result?.map((itd) => itd.category);
  const filteredCats = restCats?.filter(
    (item) => !existCats.includes(item?.category_id)
  );
  return (
    <Grid container spacing={1}>
      {result?.map((item) => (
        <Grid
          item
          md={3}
          xs={12}
          key={item.id}
          onClick={
            item?.value > 0
              ? () =>
                  router.push(
                    `/dashboard/html/${item?.category}?report=${fileData?.id}&&categoryName=${item?.title}`
                  )
              : null
          }
        >
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
              background:
                item.category === "total" ? "#08cf65" : "paper.backround",
            }}
          >
            <div>
              <Typography
                component="h6"
                color={item?.category === "total" ? "#ffffff" : "textSecondary"}
                variant="overline"
                align="center"
              >
                {item.title}
              </Typography>
              <Typography
                variant="h5"
                textAlign="center"
                color={item?.category === "total" ? "#ffffff" : "textSecondary"}
              >
                {fileData?.categories?.find(
                  (val) => val?.category_id === item?.category
                )["category_count"]
                  ? fileData?.categories?.find(
                      (val) => val?.category_id === item?.category
                    )["category_count"]
                  : 0}
              </Typography>
              <Typography
                color={item?.category === "total" ? "#ffffff" : "textSecondary"}
                variant="body2"
              >
                Total articles
              </Typography>
            </div>
          </Card>
        </Grid>
      ))}
      {filteredCats??.map((item) => (
        <Grid
          item
          md={3}
          xs={12}
          key={item.id}
          onClick={
            item?.category_count > 0
              ? () =>
                  router.push(
                    `/dashboard/html/${item?.category_id}?report=${fileData?.id}&&categoryName=${item?.category_title}`
                  )
              : null
          }
        >
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
              background:
                item.category === "total" ? "#08cf65" : "paper.backround",
            }}
          >
            <div>
              <Typography
                component="h6"
                color={item?.category === "total" ? "#ffffff" : "textSecondary"}
                variant="overline"
                align="center"
              >
                {item?.category_title}
              </Typography>
              <Typography
                variant="h5"
                textAlign="center"
                color={item?.category === "total" ? "#ffffff" : "textSecondary"}
              >
                {item?.category_count}
              </Typography>
              <Typography
                color={item?.category === "total" ? "#ffffff" : "textSecondary"}
                variant="body2"
              >
                Total articles
              </Typography>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
