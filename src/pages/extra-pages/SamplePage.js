// material-ui

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '../../../node_modules/@mui/material/index';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Rating from '@mui/material/Rating';
import { Button } from '../../../node_modules/@mui/material/index';
import { setBookShelfData } from 'utils/firebase.utils';

// project import
import MainCard from 'components/MainCard';
import { useParams } from '../../../node_modules/react-router/dist/index';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage(){
  const location = useParams();
  console.log(location)
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
  const description = "A book description is a short summary of a book’s story or content that is designed to “hook” a reader and lead to a sale. Typically, the book’s description conveys important information about its topic or focus (in nonfiction) or the plot and tone (for a novel or any other piece of fiction). Readers can usually find the back description on the back cover of a book, or prominently displayed on retailer websites, like Amazon Self-publishing authors typically write their own book descriptions, though many writers hire professional book marketers with copywriting experience to ensure that their books aren’t held back by an unexciting description.We’ll take you through our tips for writing effective book descriptions below, but first, here’s a free template to help you assemble the elements of yours.";
  const [info,setInfo] = useState({});
  const [otherBooks , setOtherBooks] = useState([]);
  function getEvents() {
      axios.get("https://www.googleapis.com/books/v1/volumes",{params:{q:location.bookid,filter:"free-ebooks"}})
     .then(response => response.data)
        .then((data) => {
          setInfo(data)
           
        });
      axios.get("https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=AIzaSyCNLoUIq9VdYgmkS77XtPjFM_QlvIdzVX8")
     .then(response => response.data)
        .then((data) => {
          setOtherBooks(data)
           
      });

}
useEffect(()=>{
    getEvents();
},[])

const handleWantToRead = (items) => {
  setBookShelfData(items,"wantToRead");
};
  return (
    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={8}>
  <Paper
      sx={{
        p: 2,

        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <Box sx={{margin:"10px"}}>
          <Img alt="complex" src={(info?.items?.length>0)?info?.items[0].volumeInfo.imageLinks.thumbnail:'' } />
          </Box>
            <Button variant="outlined"  sx={{margin:"10px"}} onClick={()=>handleWantToRead((info?.items?.length>0)?info?.items[0]:'')}>Want to Read</Button>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography  gutterBottom variant="h2" component="div">
              {(info?.items?.length>0)?info?.items[0].volumeInfo.title:'' }
              </Typography>
              <Typography gutterBottom variant="h3" color="text.secondary">
              {(info?.items?.length>0)?(info?.items[0].volumeInfo.authors)?(info?.items[0].volumeInfo.authors):'William Henry':'Jack Smith' }
              </Typography>
              <Rating name="half-rating" fontSize="30px" defaultValue={2.5} precision={0.5} />
              <Typography gutterBottom variant="h5" color="text.secondary">
              {(info?.items?.length>0)?(info?.items[0].volumeInfo.description)?(info?.items[0].volumeInfo.description):description:description }
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </Grid>
  <Grid item xs={4} sx={{height:"100vh"}}>
    <MainCard>
    <Typography  gutterBottom variant="h3" component="div">
              {"Recommended Books"}
              </Typography>
              
              {
                otherBooks?.items?.length===0?'No data found':otherBooks?.items?.map((otherBook) => {
                  return(
                    <Paper key={otherBook.id}
      sx={{
        p: 2,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 50, height: 100 }}>
              <Img alt="complex" src={ otherBook.volumeInfo.imageLinks.thumbnail} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography  gutterBottom variant="h4" component="div">
                {otherBook.volumeInfo.title}
                </Typography>
                <Typography gutterBottom variant="h6" color="text.secondary">
                {otherBook.volumeInfo.authors?otherBook.volumeInfo.authors:'Jack Smith' }
                </Typography>
                <Rating name="half-rating" fontSize="30px" defaultValue={otherBook.volumeInfo.title.length/10} precision={0.5} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </Paper>
                  )
                })
              }
    
    </MainCard>
  </Grid>
  
</Grid>
    )
}

