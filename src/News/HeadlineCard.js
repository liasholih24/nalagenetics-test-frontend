import axios from 'axios';
import React, {useEffect, useState} from 'react';
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
    maxWidth: 345,
    margin: "10px",
    padding: "10px"
  },
  media: {
    height: 140,
  },
});

export default function HeadlineCard() {
  const classes = useStyles();

  const [news,setNews] = useState([])
  const [counts,setCounts] = useState(1)

  async function fetchData() {
    const request = await axios.get('http://newsapi.org/v2/top-headlines?country=id&apiKey=121558c37f944ebe8379b78b4bde9923')
    const data = request.data.articles
    const counts = Math.ceil(data.length / 10)
    setNews(data)
    setCounts(counts)
    console.log(data)
  } 

  useEffect(() => {
    fetchData()
  }, []) 

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    fetchData()
  };

  return (
    <Grid container spacing={1}>
    {news.slice((page * 10) - 10, (page * 10)).map((item, index) => (
      <Grid item xs={12} sm={6}>
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
      </Grid>
     ))}
      <div>
        <Pagination count={counts} page={page} onChange={handleChange} />
      </div>
    </Grid>
    
  );
}
