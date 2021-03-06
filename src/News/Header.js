import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CountrySelect from './CountrySelect';

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  button: {
    '& > *': {
      margin: theme.spacing(1),
    }
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title, onCategoryClick, handleCountry, id, name} = props;
  const Authname = localStorage.getItem('name')

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
      <Typography align="left" variant="h6" gutterBottom className={classes.sidebarSection}>
        <CountrySelect handleCountry={handleCountry} id={id} name={name}/>
      </Typography>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        {Authname ? Authname : 
        <div className={classes.button}>
          <Button variant="outlined" size="small" href="/sign-in">Sign in</Button>
          <Button variant="outlined" size="small" href="/sign-up">Sign up</Button>
        </div>
        } 
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map(section => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            data-id={section.key}
            data-title={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
            onClick={onCategoryClick}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
