// material-ui
import { Box,
  //  IconButton,
    // Link,
     useMediaQuery } from '@mui/material';
// import { GithubOutlined } from '@ant-design/icons';

// project import
// import Search from './Search';
import Profile from './Profile';
import MobileSection from './MobileSection';
import { checkLogin } from 'utils/firebase.utils';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const userDetails = checkLogin();

  return (
    <>
      
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

      {!matchesXs && <Profile userDetails={userDetails}/>}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
