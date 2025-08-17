import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import FinalExamCalculator from '../Calculators/Final-Exam-Calculator/FinalExamCalculator';
import GradeAverage from '../Calculators/Average-Grades/Average-Grades';
import './Home.css';
import WeightedGrades from '../Calculators/Weighted-Grades/Weighted-Grades';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Box role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box className='tool-box' sx={{ p: { xs: 1.5, sm: 2 }, }}>{children}</Box>}
    </Box>
  );
}
CustomTabPanel.propTypes = { children: PropTypes.node, index: PropTypes.number.isRequired, value: PropTypes.number.isRequired };

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const Home = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (_e, newValue) => setValue(newValue);

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ px: { xs: 1, sm: 2 }, pt: 1 }}>
        <Typography variant="h5" align="center" sx={{ fontWeight: 700 }}>
          Calculadora de Notas
        </Typography>
      </Box>

      {/* Tabs strip with its own horizontal scroll */}
      <Box
        sx={{
          mt: 1,
          borderBottom: 1,
          borderColor: 'divider',
          width: '100%',
          maxWidth: '100vw',
          overflowX: 'auto',
          overflowY: 'hidden',
          WebkitOverflowScrolling: 'touch',
          px: 0,   // ❌ remove padding here to avoid horizontal scroll
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="calculator tabs"
          sx={{
            width: 'max-content',
            minWidth: 'max-content',
            '& .MuiTabs-flexContainer': { flexWrap: 'nowrap' },
            '& .MuiTab-root': {
              fontWeight: 500,
              textTransform: 'none',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              minWidth: { xs: 120, sm: 140 },
              px: { xs: 1, sm: 2 },
              flexShrink: 0,
            },
          }}
        >
          <Tab label="Final Calculator" {...a11yProps(0)} />
          <Tab label="Grade Average" {...a11yProps(1)} />
          <Tab label="Item One" {...a11yProps(2)} />
          <Tab label="Item Two" {...a11yProps(3)} />
        </Tabs>
      </Box>

      {/* Panels */}
      <CustomTabPanel value={value} index={0}>
        <FinalExamCalculator />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GradeAverage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <WeightedGrades />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item Two
      </CustomTabPanel>
    </Box>
  );
};

export default Home;
