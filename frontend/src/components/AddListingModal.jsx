import React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { apiCallPost, fileToDataUrl } from '../helpers';
import AddBedrooms from './AddBedrooms';
import AddAmenities from './AddAmenities';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  overflow: 'scroll',
  maxWidth: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddListingModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  }

  const [title, setTitle] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [postcode, setPostcode] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [thumbnail, setThumbnail] = React.useState(undefined);
  const [type, setType] = React.useState('');
  const [bathrooms, setBathrooms] = React.useState('');

  const [bedrooms, setBedrooms] = React.useState([{ id: 1, beds: 1 }]);
  const [amenities, setAmenities] = React.useState([{ id: 1, name: '' }]);

  const addListing = async () => {
    const data = await apiCallPost('listings/new', {
      title,
      address: {
        street,
        city,
        state,
        postcode,
        country
      },
      price,
      thumbnail,
      metadata: {
        type,
        bathrooms,
        bedrooms,
        amenities,
        images: []
      }
    },
    props.token);

    if (data.error) {
      alert(data.error);
    } else {
      resetForm();
      props.setListingsChanged(true);
      handleClose();
    }
  }

  const resetForm = () => {
    setTitle('');
    setStreet('');
    setCity('');
    setState('');
    setPostcode('');
    setCountry('');
    setPrice('');
    setThumbnail('');
    setType('');
    setBathrooms('');
    setBedrooms([{ id: 1, beds: 1 }]);
    setAmenities([{ id: 1, name: '' }]);
  }

  return (
    <>
      <Button onClick={handleOpen}>Add a Listing</Button>
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
              Add a Listing
            </Typography>
            <IconButton onClick={() => handleClose()}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <Typography variant='h6'>
              Address
            </Typography>
            <TextField
              required
              label="Street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <TextField
              required
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              required
              label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <TextField
              required
              label="Postcode"
              type='number'
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
            <TextField
              required
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <Divider />
            <Typography variant='h6'>
              Details
            </Typography>
            <TextField
              required
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              required
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <TextField
              label="Price"
              required
              type="number"
              value={price}
              placeholder="per night"
              onChange={(e) => {
                setPrice(e.target.value);
              }
              }
            />
            <TextField
              required
              label="Bathrooms"
              type="number"
              value={bathrooms}
              placeholder="How many bathrooms"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setBathrooms(e.target.value)}
            />
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button variant='outlined'
                sx={{ margin: '10px 3px', textAlign: 'center' }}
                component='label'
                data-test-target="UploadThumbnail"
              >
                Upload Thumbnail
                <input
                  type="file"
                  hidden
                  onChange={async (e) => {
                    const fileString = await fileToDataUrl(e.target.files[0]);
                    setThumbnail(fileString);
                  }}
                />
              </Button>
              <img
                style={{ marginLeft: '5px', height: '30px', width: '30px' }}
                src={thumbnail}
              >
              </img>
            </Box>
            <Divider />
            <Typography variant='h6'>
              Bedrooms
            </Typography>
            <AddBedrooms bedrooms={bedrooms} setBedrooms={setBedrooms} />
            <Divider sx={{ paddingTop: '10px' }} />
            <Typography variant='h6'>
              Amenities
            </Typography>
            <AddAmenities amenities={amenities} setAmenities={setAmenities} />
          </Box>
          <Divider sx={{ paddingTop: '10px' }} />
          <Button onClick={() => {
            addListing();
          }}>
            Add Listing
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default AddListingModal;
