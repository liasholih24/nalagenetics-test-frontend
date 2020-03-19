import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  root: {
    minWidth: 275,
    marginTop:15
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const { description, title, showSaved } = props;
  const AuthToken = localStorage.getItem('myToken')
  const AuthName = localStorage.getItem('name')

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      {AuthToken ?
      <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Profil Information
        </Typography>
        <Typography variant="h5" component="h2">
          {AuthName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={showSaved}>My Saved News</Button>
      </CardActions>
    </Card> : null}
      
    </Grid>
  );
}

Sidebar.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};
