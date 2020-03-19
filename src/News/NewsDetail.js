import React from 'react';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles(theme => ({
  spacing: {
    margin: "10px",
    padding: "10px"
  },
}));

export default function Main(props) {
  const classes = useStyles();
  const {newsTitle, newspublishedAt, newscontent, newsauthor} = props

  return (
    <Grid item xs={12} md={8}>
      <SvgIcon style={{ marginBottom: "10px" }}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon> 
      <Link href="/">Back to Home</Link> 
      <Typography variant="h5" gutterBottom>
        {newsTitle}
      </Typography>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
      < Moment format="DD/MM/YYYY HH:mm">{newspublishedAt}</Moment> by {newsauthor}
      </Typography>
     <Typography gutterBottom variant="subtitle1" component="subtitle1">
        {newscontent}
     </Typography>
      
    </Grid>
  );
}

