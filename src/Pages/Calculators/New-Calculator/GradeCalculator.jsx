import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

// Styled Item component for the Grid items
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const GradeCalculator = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
        <Grid item xs={12} sm={6} lg={6}>
          <Item>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <Item>2</Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GradeCalculator;