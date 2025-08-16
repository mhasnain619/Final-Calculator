import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tabs, Tab } from '@mui/material';
import FinalExamCalculator from '../Calculators/Final-Exam-Calculator/FinalExamCalculator';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Home = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Tabs Container */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          overflowX: 'auto',       // enable horizontal scroll
          '&::-webkit-scrollbar': { display: 'none' }, // hide scrollbar
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="custom tabs"
          variant="scrollable"    // make tabs scrollable
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
          sx={{
            '& .MuiTab-root': {
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '1rem',
              color: 'text.secondary',
              minWidth: 120,      // each tab width
            },
            '& .Mui-selected': {
              color: 'primary.main',
              fontWeight: 'bold',
            },
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: 2,
            },
          }}
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Extra Long Tab" {...a11yProps(3)} />
          <Tab label="Another Tab" {...a11yProps(4)} />
        </Tabs>
      </Box>

      {/* Panels */}
      <CustomTabPanel value={value} index={0}>
        <FinalExamCalculator />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
};

export default Home;
