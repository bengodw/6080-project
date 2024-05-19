import React from 'react';

import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

const AddBedrooms = (props) => {
  const addBedroom = () => {
    if (props.bedrooms.length < 8) {
      props.setBedrooms([...props.bedrooms, { id: props.bedrooms.length + 1, beds: 1 }]);
    }
  };

  const handleBedsChange = (id, beds) => {
    props.setBedrooms((prevBedrooms) =>
      prevBedrooms.map((bedroom) =>
        bedroom.id === id ? { ...bedroom, beds } : bedroom
      )
    );
  };

  const removeBedroom = (id) => {
    props.setBedrooms((prevBedrooms) => prevBedrooms.filter((bedroom) => bedroom.id !== id));
  };

  return (
    <>
      {props.bedrooms.map((bedroom) => (
        <Box key={bedroom.id} sx= {{ display: 'flex', alignItems: 'center' }}>
            <Typography>
              Bedroom {bedroom.id}
            </Typography>
            <TextField
              label="Beds"
              variant="outlined"
              size='small'
              type="number"
              style={{ width: '70px' }}
              value={bedroom.beds}
              onChange={(e) => handleBedsChange(bedroom.id, e.target.value)}
            />
          <Button variant='outlined' color='secondary' size='small' onClick={() => removeBedroom(bedroom.id)}>
            Remove Bedroom
          </Button>
        </Box>
      ))}
      {props.bedrooms.length < 8 && (
        <Button variant='outlined' onClick={(e) => {
          e.preventDefault();
          addBedroom();
        }}
        >
          Add Another Bedroom
        </Button>
      )}
    </>
  );
}

export default AddBedrooms;
