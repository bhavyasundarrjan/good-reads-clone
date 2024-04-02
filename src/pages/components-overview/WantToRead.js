
import {
  Grid
} from '@mui/material';

// project import
import OrdersTable from 'pages/dashboard/OrdersTable';

import MainCard from 'components/MainCard';
const WantToRead = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={7} lg={12}>
            <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable shelfDetail={"wantToRead"}/>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default WantToRead;
