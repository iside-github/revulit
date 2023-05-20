import { Container, Stack } from "@mui/system";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import CreateCompany from "components/superadmin/create-company";
import CreateUser from "components/superadmin/create-user";
import { CompanyListTable } from "components/superadmin/CompanyList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Page = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack>
      <Container>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Companies" {...a11yProps(0)} />
              <Tab label="Create company" {...a11yProps(1)} />
              <Tab label="Create user" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Stack>
              <CompanyListTable />
            </Stack>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CreateCompany />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CreateUser />
          </TabPanel>
        </Box>
      </Container>
    </Stack>
  );
};

export default Page;
