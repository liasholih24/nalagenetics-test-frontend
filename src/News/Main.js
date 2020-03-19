import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import HeadlineCard from './HeadlineCard';

export default function Main(props) {

  const {category, news, page, counts, handleChange, handleSection} = props

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        Top Headlines
      </Typography>
      <Divider />
   
        <HeadlineCard category={category} news={news} page={page} counts={counts} handleChange={handleChange} handleSection={handleSection}/>
    
    </Grid>
  );
}

