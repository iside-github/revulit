import NextLink from "next/link";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { useSelector } from "react-redux";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;

  const user = useSelector((state) => state.user?.data?.user);

  const handleLogout = async () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      {...other}
    >
      <Box
        sx={{
          alignItems: "center",
          p: 2,
          display: "flex",
        }}
      >
        <Avatar
          src={"/static/avatar.png"}
          sx={{
            height: 40,
            width: 40,
          }}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
        <Box
          sx={{
            ml: 1,
          }}
        >
          <Typography variant="body1">{user?.name}</Typography>
          <Typography color="textSecondary" variant="body2">
            {user?.company?.name}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ my: 1 }}>
        <NextLink href="/dashboard/account" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <UserCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" color="primary">
                  Profile
                </Typography>
              }
            />
          </MenuItem>
        </NextLink>
        {/* <NextLink href="/dashboard/account" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <CogIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" color="primary">
                  Settings
                </Typography>
              }
            />
          </MenuItem>
        </NextLink> */}
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">Logout</Typography>}
          />
        </MenuItem>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
