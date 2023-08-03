import { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { getUser } from "redux-store/user/user.slice";
import { useEffect } from "react";
import { useRouter } from "next/router";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

export const DashboardLayout = (props) => {
  const dispatch = useDispatch();
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");
  const router = useRouter();

  useEffect(() => {
    if (token) {
      dispatch(getUser());
    }
    if (!token) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onOpenSidebar={() => setIsSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setIsSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
