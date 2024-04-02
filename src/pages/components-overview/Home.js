import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Grid } from '../../../node_modules/@mui/material/index';
import { useState, useEffect } from 'react';
import { Rating } from '../../../node_modules/@mui/material/index';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';
import { Link } from '../../../node_modules/@mui/material/index';
import { Link as RouterLink } from 'react-router-dom';

export default function Home() {
    const [rows, setRows] = useState([]);
    const [filter,setFilter] = useState("flowers")
    const Img = styled('img')({
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    });
    //const description = "A book description is a short summary of a book’s story or content that is designed to “hook” a reader and lead to a sale. Typically, the book’s description conveys important information about its topic or focus (in nonfiction) or the plot and tone (for a novel or any other piece of fiction). Readers can usually find the back description on the back cover of a book, or prominently displayed on retailer websites, like Amazon Self-publishing authors typically write their own book descriptions, though many writers hire professional book marketers with copywriting experience to ensure that their books aren’t held back by an unexciting description.We’ll take you through our tips for writing effective book descriptions below, but first, here’s a free template to help you assemble the elements of yours.";
    function getEvents() {
       
          axios.get("https://www.googleapis.com/books/v1/volumes",{params:{q:filter??"Flowers",startIndex :0,maxResults :40,filter:"free-ebooks"},})
         .then(response => response.data)
            .then((data) => {
              setRows(data)
            });
    }
    useEffect(()=>{
        getEvents();
    },[])

    const handleChange = (e) => {
     setFilter(e.target.value);
     getEvents();
    }



  return (
    <Grid item xs={12} md={7} lg={12}>
      <Grid item xs={6} md={7} lg={12} justifyContent="right">
      <Search handleChange={handleChange}></Search>
      </Grid>
     
    <Grid container alignItems="center" justifyContent="left">
        {
            rows?.items?.length<0 ? "No Data to display" : rows?.items?.map((row) => {
        return (
          <Link key={row.id} color="secondary" component={RouterLink} to={{ pathname: `/detail-page/${row.id}`}}>
    <Card key={row.id} sx={{ width: 250, minHeight: 350, maxHeight: 350, margin: 2}} >
      <Img alt="complex" src={row?.volumeInfo?.imageLinks?.thumbnail} sx={{height:"200px"}} />
      
      <CardContent>
        <Typography gutterBottom variant="h4" component="div" sx={{height:"50px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"no-wrap"}}>
        {row.volumeInfo.title}
        </Typography>
        <Typography gutterBottom variant="h5" color="text.secondary" component="div" sx={{height:"20px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"no-wrap"}}>
        {row.volumeInfo.authors??"William Henry"}
        </Typography>
        <Rating name="half-rating" defaultValue={row.volumeInfo.title.length/10} precision={0.5} sx={{height:"20px"}}/>
      </CardContent>
      
    </Card>
    </Link>
        );})}
    </Grid>
    </Grid>
  );
}
