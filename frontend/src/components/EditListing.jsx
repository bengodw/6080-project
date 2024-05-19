import React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';

import { fileToDataUrl, apiCallGet, apiCallPut } from '../helpers';
import AddBedrooms from './AddBedrooms';
import AddAmenities from './AddAmenities';
import AddImages from './AddImages';

const EditListing = (props) => {
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
  const [images, setImages] = React.useState([])

  const id = useParams().id;
  const navigate = useNavigate();

  const getListing = async () => {
    const data = await apiCallGet(`listings/${id}`, '', props.token);
    return data;
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const listing = await getListing();
        setInitialForm(listing.listing);
      } catch (error) {
        alert(error);
      }
    };

    fetchData();
  }, []);

  const editListing = async () => {
    const data = await apiCallPut(`listings/${id}`, {
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
        images
      }
    },
    props.token);

    if (data.error) {
      alert(data.error);
    } else {
      navigate('/myListings');
    }
  }

  const setInitialForm = (listing) => {
    setTitle(listing.title);
    setStreet(listing.address.street);
    setCity(listing.address.city);
    setState(listing.address.state);
    setPostcode(listing.address.postcode);
    setCountry(listing.address.country);
    setPrice(listing.price);
    setThumbnail(listing.thumbnail);
    setType(listing.metadata.type);
    setBathrooms(listing.metadata.bathrooms);
    setBedrooms(listing.metadata.bedrooms);
    setAmenities(listing.metadata.amenities);
    setImages(listing.metadata.images);
  }

  return (
    <>
      <Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        >
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Edit Listing
          </Typography>
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
            Images
          </Typography>
          <AddImages images={images} setImages={setImages} />
          <Divider sx={{ paddingTop: '10px' }} />
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
          editListing();
        }}>
          Apply Changes
        </Button>
      </Box>
    </>
  );
}

export default EditListing;
