import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { setBookShelfData } from 'utils/firebase.utils';

export default function BookShelfDropDown({book}) {
  const [anchorEl, setAnchorEl] = React.useState();
  const [option, setOption]= React.useState("Add to Shelf");
 
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (shelf,label) => {
    setAnchorEl(null);
    setOption(label);
    setBookShelfData(book,shelf)
    // console.log(label,id,setOption(null))
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {option}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={()=>handleClose("read","Read")}>Read</MenuItem>
        <MenuItem onClick={()=>handleClose("currentlyRead","Currently Reading")}>Currently Reading</MenuItem>
        <MenuItem onClick={()=>handleClose("toRead", "Want to Read" )}>Want to Read</MenuItem>
      </Menu>
    </div>
  );
}