// import PropTypes from 'prop-types';
import { useState, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';
// import axios from 'axios';
import BookShelfDropDown from './BookShelfDropDown';
// import { CircularProgress } from '../../../node_modules/@mui/material/index';
// import { Stack } from '../../../node_modules/@mui/material/index';
// material-ui
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Rating, Button } from '@mui/material';
// import { TablePagination } from '../../../node_modules/@mui/material/index';
// third-party
// import { NumericFormat } from 'react-number-format';

// project import
// import Dot from 'components/@extended/Dot';
import { getBookShelfData } from 'utils/firebase.utils';
import { CircularProgress } from '../../../node_modules/@mui/material/index';
// import Typography from 'themes/overrides/Typography';
// import Rating from '@mui/material/Rating';
// import { Button } from '../../../node_modules/@mui/material/index';

// function createData(trackingNo, name, fat, carbs, protein) {
//   return { trackingNo, name, fat, carbs, protein };
// }




// function stableSort(array, comparator) {
//   const stabilizedThis = array?.map((el, index) => [el, index]);
//   stabilizedThis?.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'cover',
    align: 'left',
    disablePadding: false,
    label: 'Cover',
    width:'15%'
  },
  {
    id: 'title',
    align: 'left',
    disablePadding: true,
    label: 'Title',
    width:'20%'
   
  },
  {
    id: 'author',
    align: 'left',
    disablePadding: false,
    label: 'Author',
    width:'15%'
  },
  {
    id: 'shelf',
    align: 'left',
    disablePadding: false,
    label: 'Shelf',
    width:'15%'
  },
  {
    id: 'rating',
    align: 'left',
    disablePadding: false,
    label: 'Rating',
    width:'20%'
  },
  {
    id: 'review',
    align: 'left',
    disablePadding: false,
    label: 'Review',
    width:'15%'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            width={headCell.width}
            sx={{whiteSpace:'normal !important'}}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable({shelfDetail}) {
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
 // const [selected] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setIsLoading] = useState(true)

 // const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
//  const handleChangePage = (event, newPage) => {
//   setPage(newPage);
// };

// const handleChangeRowsPerPage = (event) => {
//   setRowsPerPage(+event.target.value);
//   setPage(0);
// };


 async function getEvents(){
    // setIsLoading(true);
    //   axios.get("https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=AIzaSyCNLoUIq9VdYgmkS77XtPjFM_QlvIdzVX8")
    //  .then(response => response.data)
    //     .then((data) => {
    //       setRows(data)
    //         setIsLoading(false);
    //     });
        let allBookDetails = await getBookShelfData();
        
      //  ?.filter((book)=> { book.shelf === shelfDetail
      //   })    
        console.log(allBookDetails);
        console.log(shelfDetail)
        let availableBooks = shelfDetail==="all"?allBookDetails:allBookDetails.filter((book)=> book?.shelf === shelfDetail)
        console.log(availableBooks);
        
       setRows(availableBooks);
       setIsLoading(false)

}
useEffect(()=>{
    getEvents();
},[])

  return (
   <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflow:"hidden",
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          minHeight:'200px',
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <OrderTableHead  />
          {loading?<Box height="100%" sx={{position: "absolute", top: '60%',left: '50%',overflow:"hidden"}} >
   <CircularProgress/>
  </Box>:''}
          {(!loading && rows.length=== 0) ? <Box height="100%" sx={{position: "absolute", top: '60%',left: '50%',overflow:"hidden"}} >
    No data to display
  </Box>:
          <TableBody key={rows.length} sx={{minHeight:"50px"}}>
            {rows.length>0?rows.map((row, index) => {
              //const isItemSelected = isSelected(row.trackingNo);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  // aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  // selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="left" sx={{whiteSpace:'normal'}} >
                    <Link color="secondary" component={RouterLink} to={{ pathname: `/detail-page/${row.id}`}}>
                      {<img alt={row.title} src={row.cover}></img>}
                      
                    </Link>
                  </TableCell>
                  <TableCell align="left" sx={{whiteSpace:'normal'}}>{row.title}</TableCell>
                  <TableCell align="left"sx={{whiteSpace:'normal'}}>{(row?.author[0])?row?.author[0]:"William Henry"}</TableCell>
                  <TableCell align="left" sx={{whiteSpace:'normal'}}><BookShelfDropDown book={row}/></TableCell>
                  <TableCell align="left" sx={{whiteSpace:'normal'}}>
                    {<Rating name="half-rating" defaultValue={row.title.length/10} precision={0.5} />}
                  </TableCell>
                  <TableCell align="left" sx={{whiteSpace:'normal'}}>
                  <Button variant="text">Add Review</Button>
                  </TableCell>
                </TableRow>
              );
            }):<TableRow height="100%" sx={{position: "absolute", top: '60%',left: '50%',overflow:"hidden"}} >
               <TableCell align="left">Loading</TableCell>
            
          </TableRow>}
          </TableBody>}
        </Table>
      </TableContainer>
       {/* {rows.length> 0 ?
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />:''
}  */}
    </Box>
  );
}
