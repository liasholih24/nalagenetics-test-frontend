import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
}));

export default function DialogSelect() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState('');

  const countries = [
    { name: 'Argentina', id: 'ar' },
    { name: 'Austria', id: 'at' },
    { name: 'Brazil', id: 'br' },
    { name: 'Canada', id: 'ca' },
    { name: 'Colombia', id: 'co' },
    { name: 'Czech Republic', id: 'cz' },
    { name: 'France', id: 'fr' },
    { name: 'Greece', id: 'gr' },
    { name: 'Hungary', id: 'hu' },
    { name: 'Indonesia', id: 'id' },
    { name: 'Israel', id: 'il' },
    { name: 'Japan', id: 'jp' },
    { name: 'Lithuania', id: 'lt' },
    { name: 'Mexico', id: 'mx' },
    { name: 'Netherlands', id: 'nl' },
    { name: 'Nigeria', id: 'ng' },
    { name: 'Philipines', id: 'ph' },
    { name: 'Portugal', id: 'pt' },
    { name: 'Russia', id: 'ru' },
    { name: 'Serbia', id: 'rs' },
    { name: 'Slovakia', id: 'sk' },
    { name: 'South Africa', id: 'za' },
    { name: 'Sweden', id: 'se' },
    { name: 'Taiwan', id: 'tw' },
    { name: 'Turkey', id: 'tr' },
    { name: 'Ukraine', id: 'ua' },
    { name: 'United States', id: 'us' },
    { name: 'Australia', id: 'au' },
    { name: 'Belgium', id: 'be' },
    { name: 'Bulgaria', id: 'bg' },
    { name: 'China', id: 'cn' },
    { name: 'Cuba', id: 'cu' },
    { name: 'Eigypt', id: 'eg' },
    { name: 'Germany', id: 'de' },
    { name: 'Hongkong', id: 'hk' },
    { name: 'India', id: 'in' },
    { name: 'Ireland', id: 'ie' },
    { name: 'Italy', id: 'it' },
    { name: 'Latvia', id: 'lv' },
    { name: 'Malaysia', id: 'my' },
    { name: 'Morocco', id: 'ma' },
    { name: 'New Zealand', id: 'nz' },
    { name: 'Norway', id: 'no' },
    { name: 'Poland', id: 'pl' },
    { name: 'Romania', id: 'ro' },
    { name: 'Saudi Arabia', id: 'sa' },
    { name: 'Singapore', id: 'sg' },
    { name: 'Slovenia', id: 'si' },
    { name: 'South Korea', id: 'kr' },
    { name: 'Switzerland', id: 'ch' },
    { name: 'Thailand', id: 'th' },
    { name: 'UAE', id: 'ae' },
    { name: 'United Kingdom', id: 'gb' },
    { name: 'Venezuela', id: 've' }
  ];

  const handleChange = (event) => {
     setId(event.target.value || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Change Country</Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogContent>
          <form className={classes.container}>
          <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={id}
          onChange={handleChange}
        >
          {countries.map(country => (
            <MenuItem key={country.id} value={country.id} >{country.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
