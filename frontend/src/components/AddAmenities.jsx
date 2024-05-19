import React from 'react';

import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

const AddAmenities = (props) => {
  const addAmenity = () => {
    if (props.amenities.length < 15) {
      props.setAmenities([...props.amenities, { id: props.amenities.length + 1, name: '' }]);
    }
  };

  const removeAmenity = (id) => {
    props.setAmenities((prevAmenities) => prevAmenities.filter((amenity) => amenity.id !== id));
  };

  const handleAmenityChange = (id, name) => {
    props.setAmenities((prevAmenities) =>
      prevAmenities.map((amenity) =>
        amenity.id === id ? { ...amenity, name } : amenity
      )
    );
  };

  return (
    <>
      {props.amenities.map((amenity) => (
        <Box key={amenity.id} sx= {{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label={'Amenity ' + amenity.id}
              variant="outlined"
              size='small'
              value={amenity.name}
              onChange={(e) => handleAmenityChange(amenity.id, e.target.value)}
            />
          <Button variant='outlined' color='secondary' size='small' onClick={() => removeAmenity(amenity.id)}>
            Remove Amenity
          </Button>
        </Box>
      ))}
      <br></br>
      {props.amenities.length < 15 && (
        <Button variant='outlined' onClick={(e) => {
          e.preventDefault();
          addAmenity();
        }}
        >
          Add Another Amenity
        </Button>
      )}
    </>
  );
}

export default AddAmenities;
