import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
  Stack,
  Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import ProfileTab from './ProfileTab';
import { logoutFromFireBase } from 'utils/firebase.utils';
import { checkLogin } from 'utils/firebase.utils';

// assets
// import { LogoutOutlined } from '@ant-design/icons';

import Divider from '@mui/material/Divider';
// import InputFileUpload from 'pages/components-overview/UploadButton';



// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = ({userDetails}) => {
  const theme = useTheme();
  userDetails = checkLogin();
  console.log(userDetails)
  const handleLogout = async () => {
    logoutFromFireBase()
    // logout
  };

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };


  const iconBackColorOpen = 'grey.300';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75,width:"100%" }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' },
          position:"relative",
          float:"right",
          pr:"20px"
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar alt="profile user" src={(userDetails?.photoURL)??"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} sx={{ width: 32, height: 32 }} />
          <Typography variant="subtitle1">{(userDetails?.displayName)??"User Name"}</Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down('md')]: {
                    maxWidth: 250
                  }
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Stack direction="row" spacing={1.25} alignItems="center">
                            <Avatar alt="profile user" src={(userDetails?.photoURL)??"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} sx={{ width: 32, height: 32 }} />
                            <Stack>
                              <Typography variant="h6">{(userDetails?.displayName)??"User Name"}</Typography>
                              
                              {/* yet to implement <InputFileUpload></InputFileUpload> */}
                            </Stack>
                          </Stack>
                        </Grid>
                        {/* <Grid item>
                          <IconButton size="large" color="secondary" onClick={handleLogout}>
                            <LogoutOutlined />
                          </IconButton>
                        </Grid> */}
                      </Grid>
                    </CardContent>
                    {open && (
                      <>
                        <Divider></Divider>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      
                        <ProfileTab handleLogout={handleLogout} />
                         
                        </Box>
                       
                      </>
                    )}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
