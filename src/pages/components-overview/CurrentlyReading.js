
import { Grid} from '@mui/material';
import OrdersTable from 'pages/dashboard/OrdersTable';
import MainCard from 'components/MainCard';

const CurrentlyReading = () => {

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={7} lg={12}>   
          <MainCard sx={{ mt: 2 }} content={false}>
            <OrdersTable shelfDetail={"currentlyRead"}/>
          </MainCard>
      </Grid>
    </Grid>
  );
};

export default CurrentlyReading;
