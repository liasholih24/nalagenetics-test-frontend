import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
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
  load: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
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
  title: 'Welcome to News',
  description:
    "Get breaking news headline from worlwide and search article from over 30,000 news sources and blogs.",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};


const sidebar = { 
  title: 'About',
  description: 'News API is great as a data source for news tickers and other applications where you want to show your users live headlines. We track headlines in 7 categories across over 50 countries, and at over a hundred top publications and blogs, in near real time'
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
  const [maintitle, setMainTitle] = useState('Top Headlines')
  const [loader, setLoader] = useState(false)
  const AuthToken = localStorage.getItem('myToken')
  const userId = localStorage.getItem('userId')
  
  async function fetchData(category, country) {

     await axios.get('http://localhost:3001/v2/top-headlines?country='+country+'&category='+category+'&apiKey=121558c37f944ebe8379b78b4bde9923').then((result) => {

    const data = result.data.articles
      const counts = Math.ceil(data.length / 6)
      setNews(data)
      setCounts(counts)
      setCategory(category)
      setCountry(country)
      setLoader(false)
       
    })
    
  } 

  async function fetchSavedData() {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` }
    };

     await axios.get('http://localhost:3001/news?userId'+userId,config).then((result) => {
      const data = result.data
      const counts = Math.ceil(data.length / 6)
      setNews(data)
      setCounts(counts)
      setLoader(false)
    })
    
  }

  useEffect(() => {
    setLoader(true)
    fetchData('technology','id')
  }, []) 

  const handleChange = (event, value) => { 
    setPage(value)
    fetchData(category, country)
     
  }
 
  const handleCategory = (event) => {
      setLoader(true)
      setPage(1)
      setSection('main')
      setMainTitle(event.currentTarget.dataset.title+' Headlines')
      fetchData(event.currentTarget.dataset.id, country)
  }

  const handleCountry = (event) => {
    setLoader(true)
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

  const handleSave = (event) => {

    if(!AuthToken){
      alert("Please login to save news")
    }else{
      //save news

      const datas = {
        "userId" : userId,
        "title" : event.currentTarget.dataset.title,
        "publishedAt" : event.currentTarget.dataset.publishedAt,
        "author" : event.currentTarget.dataset.author,
        "content" : event.currentTarget.dataset.content
      }

      saveNews(datas)


    }
    
  }

  const saveNews = async (values) => {

    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` }
    };

    await axios.post('http://localhost:3001/news',values,config).then((result) => {

       alert("News has been saved")
        
    });

  }

  const showSaved = () =>{
    setLoader(false)
    setMainTitle('Saved News')
    fetchSavedData()
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
          {loader === false ? <Main title={maintitle} category={category} news={news} page={page} counts={counts} handleChange={handleChange} handleSection={handleSection} handleSave={handleSave} />
          : <Grid item xs={12} md={8}>
             <LinearProgress color="primary" gutterBottom/>
            </Grid>
          }
           <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            countries={sidebar.countries}
            showSaved={showSaved}
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

