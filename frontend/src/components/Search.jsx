import React from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import DatePicker, { DateObject } from 'react-multi-date-picker'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  overflow: 'scroll',
  maxWidth: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Search = (props) => {
  const [dates, setDates] = React.useState(
    [
      new DateObject().subtract(4, 'days'),
      new DateObject().add(4, 'days')
    ],
  )
  const [search, setSearch] = React.useState('')
  const [minBedrooms, setMinBedrooms] = React.useState(0)
  const [maxBedrooms, setMaxBedrooms] = React.useState(0)
  const [minPrice, setMinPrice] = React.useState(0)
  const [maxPrice, setMaxPrice] = React.useState(0)
  const [criteria, setCriteria] = React.useState('none')

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  }

  const applyCriteria = () => {
    switch (criteria) {
      case 'none':
        props.ssc({
          search: null,
          criteria: 'none',
          min: 0,
          max: 0,
          dates: null
        })
        break;
      case 'bedrooms':
        props.ssc({
          search: null,
          criteria: 'bedrooms',
          min: minBedrooms,
          max: maxBedrooms,
          dates: null
        })
        break;
      case 'price':
        props.ssc({
          search: null,
          criteria: 'price',
          min: minPrice,
          max: maxPrice,
          dates: null
        })
        break;
      case 'date':
        if (dates.length < 2) {
          alert('Not a valid date');
        } else {
          props.ssc({
            search: null,
            criteria: 'date',
            min: 0,
            max: 0,
            dates: {
              start: (new Date(dates[0].year, dates[0].month.index, dates[0].day)).toJSON(),
              end: (new Date(dates[1].year, dates[1].month.index, dates[1].day)).toJSON()
            }
          })
        }
        break;
      case 'rating-hi':
        props.ssc({
          search: null,
          criteria: 'rating-hi',
          min: 0,
          max: 0,
          dates: null
        })
        break;
      case 'rating-lo':
        props.ssc({
          search: null,
          criteria: 'rating-lo',
          min: 0,
          max: 0,
          dates: null
        })
        break;
      case 'search':
        props.ssc({
          search,
          criteria: 'search',
          min: 0,
          max: 0,
          dates: null
        })
        break;
      default:
        break;
    }
  }

  return (
    <>
      <Button onClick={handleOpen}>Filter Options</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          >
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Filter Options
            </Typography>
            <IconButton onClick={() => handleClose()}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
              '& .MuiButton-root': { m: 1, width: '10ch' },
              '& .MuiRadioGroup-root': { m: 1, width: '10ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <hr />
            <br />
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="none"
                name="radio-buttons-group"
                sx={{ display: 'flex' }}

              >
                <FormControlLabel
                  value="none"
                  control={<Radio />}
                  label="None"
                  checked={(criteria === 'none')}
                  onChange={e => {
                    setCriteria(e.target.value)
                  }}
                />
                <FormControlLabel
                  value="rating-hi"
                  control={<Radio />}
                  label="Rating (highest first)"
                  checked={(criteria === 'rating-hi')}
                  onChange={e => {
                    setCriteria(e.target.value)
                  }}
                />
                <FormControlLabel
                  value="rating-lo"
                  control={<Radio />}
                  label="Rating (lowest first)"
                  checked={(criteria === 'rating-lo')}
                  onChange={e => {
                    setCriteria(e.target.value)
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FormControlLabel
                    value="bedrooms"
                    control={<Radio />}
                    label="Bedrooms"
                    checked={(criteria === 'bedrooms')}
                    onChange={e => {
                      setCriteria(e.target.value)
                    }}
                  />
                  <TextField
                    label="Min. Bedrooms"
                    variant="outlined"
                    size='small'
                    type="number"
                    style={{ width: '120px' }}
                    defaultValue='0'
                    onChange={e => {
                      setMinBedrooms(e.target.value)
                    }}
                  />
                  <TextField
                    label="Max. Bedrooms"
                    variant="outlined"
                    size='small'
                    type="number"
                    style={{ width: '120px' }}
                    defaultValue='0'
                    onChange={e => {
                      setMaxBedrooms(e.target.value);
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FormControlLabel
                    value="price"
                    control={<Radio />}
                    label="Price"
                    checked={(criteria === 'price')}
                    onChange={e => {
                      setCriteria(e.target.value)
                    }}
                  />
                  <TextField
                    label="Min. Price"
                    variant="outlined"
                    size='small'
                    type="number"
                    style={{ width: '120px' }}
                    defaultValue='0'
                    onChange={e => {
                      setMinPrice(e.target.value);
                    }}
                  />
                  <TextField
                    label="Max. Price"
                    variant="outlined"
                    size='small'
                    type="number"
                    style={{ width: '120px' }}
                    defaultValue='0'
                    onChange={e => {
                      setMaxPrice(e.target.value);
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FormControlLabel
                    value="date"
                    control={<Radio />}
                    label="Date"
                    checked={(criteria === 'date')}
                    onChange={e => {
                      setCriteria(e.target.value)
                    }}
                  />
                  <Box sx={{ fontFamily: 'arial' }}>
                    <DatePicker
                      value={dates}
                      onChange={setDates}
                      range
                      dateSeparator=" to "
                      calendarPosition='top-left'
                    />
                  </Box>

                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FormControlLabel
                    value="search"
                    control={<Radio />}
                    label="Search"
                    checked={(criteria === 'search')}
                    onChange={e => {
                      setCriteria(e.target.value)
                    }}
                  />
                  <TextField label="Search" variant="outlined" onChange={e => setSearch(e.target.value)} />
                </Box>
              </RadioGroup>
              <Button
                variant="contained"
                onClick={e => {
                  applyCriteria();
                  handleClose();
                }}
              >
                Apply Filters
              </Button>
            </FormControl>
          </Box >
        </Box>
      </Modal>
    </>
  )
}

export default Search;
