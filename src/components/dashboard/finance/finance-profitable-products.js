import numeral from "numeral";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "../../../icons/arrow-right";
import { Image as ImageIcon } from "../../../icons/image";
import { CircularProgress } from "../../circular-progress";
import { MoreMenu } from "../../more-menu";
import { Scrollbar } from "../../scrollbar";
import { format } from "date-fns";

const products = [
  {
    id: "5eff2512c6f8737d08325676",
    conversionRate: 93,
    currency: "$",
    image: "/static/mock-images/products/product_1.png",
    name: "Healthcare Erbology",
    profit: 53500,
    sales: 13153,
  },
  {
    id: "5eff2516247f9a6fcca9f151",
    conversionRate: 76,
    currency: "$",
    image: "/static/mock-images/products/product_2.png",
    name: "Makeup Lancome Rouge",
    profit: 45763,
    sales: 10300,
  },
  {
    id: "5eff251a3bb9ab7290640f18",
    conversionRate: 60,
    currency: "$",
    name: "Lounge Puff Fabric Slipper",
    profit: 28700,
    sales: 5300,
  },
  {
    id: "5eff251e297fd17f0dc18a8b",
    conversionRate: 46,
    currency: "$",
    image: "/static/mock-images/products/product_4.png",
    name: "Skincare Necessaire",
    profit: 20400,
    sales: 1203,
  },
  {
    id: "5eff2524ef813f061b3ea39f",
    conversionRate: 41,
    currency: "$",
    image: "/static/mock-images/products/product_5.png",
    name: "Skincare Soja CO",
    profit: 15200,
    sales: 254,
  },
];

export const FinanceProfitableProducts = (props) => (
  <Card {...props}>
    <CardHeader action={<MoreMenu />} title="Recently uploaded files" />
    <Scrollbar>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell>Transaction</TableCell>
            <TableCell />
            <TableCell align="right">Uploaded time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
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
                    <Typography variant="subtitle2">{product.name}</Typography>
                    <Typography color="textSecondary" noWrap variant="body2">
                      <Typography
                        color="success.main"
                        component="span"
                        variant="subtitle2"
                      >
                        {numeral(product.sales).format("0,0")}
                      </Typography>{" "}
                      articles
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">Total</Typography>
                <Typography color="textSecondary" noWrap variant="body2">
                  {product.profit?.toLocaleString()} articles
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Box sx={{ mr: 2 }}>
                    <Typography color="textSecondary" variant="body2">
                      {format(new Date(), "dd-MMMM, yyyy HH:mm")}
                    </Typography>
                  </Box>
                  {/* <CircularProgress value={product.conversionRate} /> */}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Scrollbar>
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        p: 2,
      }}
    >
      <Button
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        sx={{ cursor: "pointer" }}
      >
        See All
      </Button>
    </Box>
  </Card>
);
