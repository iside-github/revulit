import { useEffect, useMemo, useRef, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ChartPie as ChartPieIcon } from "../../icons/chart-pie";
import { Home as HomeIcon } from "../../icons/home";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { Logo } from "../logo";
import { Scrollbar } from "../scrollbar";
import { DashboardSidebarSection } from "./dashboard-sidebar-section";
import { OrganizationPopover } from "./organization-popover";
import { Users as UsersIcon } from "../../icons/users";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useSelector } from "react-redux";

const getSections = (t) => [
  {
    title: t("General"),
    items: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <HomeIcon fontSize="small" />,
      },
      {
        title: "Report",
        path: "/dashboard/report",
        icon: <ChartPieIcon fontSize="small" />,
      },
      {
        title: "Account",
        path: "/dashboard/account",
        icon: <UserCircleIcon fontSize="small" />,
      },
    ],
  },
];
const getSections1 = (t) => [
  {
    title: t("General"),
    items: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <HomeIcon fontSize="small" />,
      },
      {
        title: "Report",
        path: "/dashboard/report",
        icon: <ChartPieIcon fontSize="small" />,
      },
      {
        title: "Users",
        path: "/dashboard/customers",
        icon: <UsersIcon fontSize="small" />,
      },
      {
        title: "Account",
        path: "/dashboard/account",
        icon: <UserCircleIcon fontSize="small" />,
      },
    ],
  },
];
const getSections2 = (t) => [
  {
    title: t("General"),
    items: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <HomeIcon fontSize="small" />,
      },
      {
        title: "Report",
        path: "/dashboard/report",
        icon: <ChartPieIcon fontSize="small" />,
      },
      {
        title: "Users",
        path: "/dashboard/customers",
        icon: <UsersIcon fontSize="small" />,
      },
      {
        title: "Account",
        path: "/dashboard/account",
        icon: <UserCircleIcon fontSize="small" />,
      },
      {
        title: "Adminstrator",
        path: "/dashboard/superadmin",
        icon: <AdminPanelSettingsIcon fontSize="medium" />,
      },
    ],
  },
];

export const DashboardSidebar = (props) => {
  const user = useSelector((state) => state.user?.data?.user);
  const { onClose, open } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });
  const sections = useMemo(() => getSections(t), [t]);
  const sections1 = useMemo(() => getSections1(t), [t]);
  const sections2 = useMemo(() => getSections2(t), [t]);
  const organizationsRef = useRef(null);
  const [openOrganizationsPopover, setOpenOrganizationsPopover] =
    useState(false);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]
  );

  const handleCloseOrganizationsPopover = () => {
    setOpenOrganizationsPopover(false);
  };

  const content = (
    <>
      <Scrollbar
        sx={{
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div>
            <Box sx={{ p: 3 }}>
              <NextLink href="/" passHref>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </NextLink>
            </Box>
            <Box sx={{ px: 2 }}>
              <Box
                sx={{
                  alignItems: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  px: 3,
                  py: "11px",
                  borderRadius: 1,
                }}
              >
                <div>
                  <Typography color="inherit" variant="subtitle1">
                    {user?.company?.name}
                  </Typography>
                  <Typography color="neutral.400" variant="body2">
                    {t("Your tier")} : Premium
                  </Typography>
                </div>
              </Box>
            </Box>
          </div>
          <Divider
            sx={{
              borderColor: "#2D3748",
              my: 3,
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {user?.roles?.includes("superadmin")
              ? sections2?.map((section) => (
                  <DashboardSidebarSection
                    key={section.title}
                    path={router.asPath}
                    sx={{
                      mt: 2,
                      "& + &": {
                        mt: 2,
                      },
                    }}
                    {...section}
                  />
                ))
              : user?.roles?.includes("admin")
              ? sections1?.map((section) => (
                  <DashboardSidebarSection
                    key={section.title}
                    path={router.asPath}
                    sx={{
                      mt: 2,
                      "& + &": {
                        mt: 2,
                      },
                    }}
                    {...section}
                  />
                ))
              : sections?.map((section) => (
                  <DashboardSidebarSection
                    key={section.title}
                    path={router.asPath}
                    sx={{
                      mt: 2,
                      "& + &": {
                        mt: 2,
                      },
                    }}
                    {...section}
                  />
                ))}
          </Box>
          <Divider
            sx={{
              borderColor: "#2D3748", // dark divider
            }}
          />
          <Box sx={{ p: 2 }}>
            <Typography color="neutral.100" variant="subtitle2">
              {t("Need Help?")}
            </Typography>
            <Typography color="neutral.500" variant="body2">
              {t("Check our documentation about how to use the platform")}
            </Typography>
            <NextLink href="/dashboard/support" passHref>
              <Button
                color="secondary"
                component="a"
                fullWidth
                sx={{ mt: 2 }}
                variant="contained"
              >
                {t("Documentation")}
              </Button>
            </NextLink>
          </Box>
        </Box>
      </Scrollbar>
      <OrganizationPopover
        anchorEl={organizationsRef.current}
        onClose={handleCloseOrganizationsPopover}
        open={openOrganizationsPopover}
      />
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            borderRightColor: "divider",
            borderRightStyle: "solid",
            borderRightWidth: (theme) =>
              theme.palette.mode === "dark" ? 1 : 0,
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
