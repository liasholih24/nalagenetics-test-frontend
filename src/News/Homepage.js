import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  { title: 'Business', url: '#' },
  { title: 'Entertainment', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Sports', url: '#' },
  { title: 'Technology', url: '#' }
];

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};


const sidebar = { 
  title: 'About',
  description: 'Get breaking news headline from worlwide and search article from over 30,000 news sources and blogs.'
};

export default function Homepage() {
  const classes = useStyles();

  return ( 
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="News" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="Top Headlines"/>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              countries={sidebar.countries}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="Footer" description="News Website!" />
    </React.Fragment>
  );
}
