import numeral from "numeral";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../scrollbar";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import EmptyComponent from "../bindings/empty";
import LoaderComponent from "../bindings/loader";

export const FinanceProfitableProducts = (props) => {
  const reports = useSelector((state) => state?.report?.recentList);
  const loading = useSelector((state) => state.report.isRecentLoading);
  function selectArrayWithLargestIndex(arrays) {
    let largestIndex = -1;
    let selectedArray = null;

    for (let i = 0; i < arrays.length; i++) {
      const currentArray = arrays[i];
      const lastIndex = currentArray.length - 1;

      if (lastIndex > largestIndex) {
        largestIndex = lastIndex;
        selectedArray = currentArray;
      }
    }

    return selectedArray;
  }
  const categories = reports?.map((categ) => {
    if (categ?.categories) {
      return categ?.categories?.filter((item) => item.category_id !== "total");
    } else {
      return [];
    }
  });
  const selectedReport = selectArrayWithLargestIndex(categories);
  return (
    <Card {...props}>
      <CardHeader title="Recently uploaded files" />
      <Scrollbar>
        {selectedReport ? (
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Transaction</TableCell>
                {selectedReport??.map((rep) => {
                  return <TableCell>{rep?.category_title}</TableCell>;
                })}
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports??.map((product) => (
                <TableRow hover key={product.id}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        "& > img": {
                          flexShrink: 0,
                          height: 56,
                          width: 56,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          alignItems: "center",
                          backgroundColor: "background.default",
                          backgroundImage: `url(/static/undraw_add_file2_gvbb.svg)`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          borderRadius: 1,
                          display: "flex",
                          height: 80,
                          justifyContent: "center",
                          overflow: "hidden",
                          width: 80,
                        }}
                      />

                      <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle2">
                          {product?.file_name}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          noWrap
                          variant="body2"
                        >
                          <Typography
                            color="success.main"
                            variant="subtitle2"
                            component="a"
                            href={`/dashboard/html/total?report=${product?._id}&&categoryName=Total`}
                            sx={{ textDecoration: "underline" }}
                          >
                            {
                              product?.categories?.find(
                                (item) => item?.category_id === "total"
                              )?.category_count
                            }
                          </Typography>{" "}
                          articles
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  {selectedReport??.map((rep) => {
                    return (
                      <TableCell>
                        <Typography
                          component="a"
                          href={`/dashboard/html/${rep?.category_id}?report=${product?._id}&&categoryName=${rep?.category_title}`}
                          sx={{ textDecoration: "underline" }}
                        >
                          {rep?.category_count ? rep?.category_count : 0}
                        </Typography>
                      </TableCell>
                    );
                  })}
                  <TableCell align="right">
                    {product?.createdAt
                      ? format(
                          new Date(product?.createdAt),
                          "dd-MMMM, yyyy HH:mm"
                        )
                      : ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : !loading&&reports.length===0 ? (
          <EmptyComponent text="You have not uploaded any files yet" />
        ) : (
          <LoaderComponent />
        )}
      </Scrollbar>
    </Card>
  );
};
