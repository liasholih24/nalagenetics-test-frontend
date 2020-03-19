import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import Main from './Main';
import NewsDetail from './NewsDetail';
import Sidebar from './Sidebar';
import Footer from './Footer';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  { title: 'Business', url: '#', key: 'business'},
  { title: 'Entertainment', url: '#', key: 'entertainment'},
  { title: 'Health', url: '#', key: 'health'},
  { title: 'Science', url: '#', key: 'science'},
  { title: 'Sports', url: '#', key: 'sports'},
  { title: 'Technology', url: '#', key: 'technology'}
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
  const [news,setNews] = useState([])
  const [counts,setCounts] = useState(1)
  const [category,setCategory] = useState('technology')
  const [country,setCountry] = useState('id')
  const [page, setPage] = useState(1);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [section, setSection] = useState('main')
  const [newsTitle, setnewsTitle] = useState('')
  const [newspublishedAt, setpublishedAt] = useState('')
  const [newscontent, setcontent] = useState('')
  const [newsauthor, setauthor] = useState('')
  
  async function fetchData(category, country) {
    const request = await axios.get('http://newsapi.org/v2/top-headlines?country='+country+'&category='+category+'&apiKey=121558c37f944ebe8379b78b4bde9923')
    const data = request.data.articles
    const counts = Math.ceil(data.length / 6)
    setNews(data)
    setCounts(counts)
    setCategory(category)
    setCountry(country)
  } 

  useEffect(() => {
    fetchData('technology','id')
  }, []) 

  const handleChange = (event, value) => { 
    setPage(value)
    fetchData(category, country)
     
  }
 
  const handleCategory = (event) => {
      setPage(1)
      fetchData(event.currentTarget.dataset.id, country)
      setSection('main')
  }

  const handleCountry = (event) => {
    setId(event.target.value || '')
    setName(event.currentTarget.dataset.name || '')
    console.log(event.target.value)
    fetchData(category, event.target.value)
    setSection('main')
 }

  const handleSection = (event) => { 
    setSection('detail')
    setnewsTitle(event.currentTarget.dataset.title)
    setpublishedAt(event.currentTarget.dataset.publishedAt)
    setcontent(event.currentTarget.dataset.content)
    setauthor(event.currentTarget.dataset.author)
  }


  return ( 
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="News" sections={sections} onCategoryClick={handleCategory} handleCountry={handleCountry} id={id} name={name} />
        {section === 'main' &&
        <main>
        <MainFeaturedPost post={mainFeaturedPost} />
        <Grid container spacing={5} className={classes.mainGrid}>
          <Main title="Top Headlines" category={category} news={news} page={page} counts={counts} handleChange={handleChange} handleSection={handleSection}/>
          <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            countries={sidebar.countries}
          />
        </Grid>
      </main>
        }
        {section === 'detail' &&
          <main>
          <Grid container spacing={5} className={classes.mainGrid}><NewsDetail newsTitle={newsTitle} 
              newspublishedAt={newspublishedAt}
              newscontent={newscontent}
              newsauthor={newsauthor}
              />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              countries={sidebar.countries}
            />
          </Grid>
        </main>
        }
      </Container>
      <Footer title="Footer" description="News Website!" />
    </React.Fragment>
  );
}

