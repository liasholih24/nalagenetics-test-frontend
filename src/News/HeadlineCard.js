import React from 'react';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    maxWidth: 820,
    margin: "10px",
    padding: "10px"
  },
  media: {
    height: 140,
  },
});

export default function HeadlineCard(props) {
  const classes = useStyles();

  const {news, page, counts, handleChange} = props

  return (
    <Grid container spacing={1}>
    {news.slice((page * 6) - 6, (page * 6)).map((item, index) => (
        <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={item.urlToImage}
                title="Contemplative Reptile"
              />
              <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                 <Moment format="DD/MM/YYYY HH:mm">
                    {item.publishedAt}
                </Moment>
              </Typography>
                <Typography gutterBottom variant="subtitle1" component="subtitle1">
                {item.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {item.author}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Save
              </Button>
              <Button size="small" color="primary">
                Read More
              </Button>
            </CardActions>
          </Card>
     ))}
      <div>
        <Pagination className={classes.root} count={counts} page={page} onChange={handleChange} />
      </div>
    </Grid>
    
  );
}
