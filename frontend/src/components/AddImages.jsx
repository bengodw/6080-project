import React from 'react';

import Button from '@mui/material/Button';
import { Box } from '@mui/material';

import { fileToDataUrl } from '../helpers';

const AddImages = (props) => {
  const addImage = () => {
    if (props.images.length < 9) {
      props.setImages([...props.images, { id: props.images.length + 1, image: null }]);
    }
  };

  const removeImage = (id) => {
    props.setImages((prevImages) => prevImages.filter((i) => i.id !== id));
  };

  const handleImageChange = (id, image) => {
    props.setImages((prevImages) =>
      prevImages.map((i) => (i.id === id ? { ...i, image } : i))
    );
  };

  return (
    <>
      {props.images.map((i, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <Button variant='outlined'
              sx={{ margin: '10px 3px', textAlign: 'center' }}
              component='label'
            >
              Upload Image
              <input
                type="file"
                hidden
                onChange={async (e) => {
                  const fileString = await fileToDataUrl(e.target.files[0]);
                  handleImageChange(i.id, fileString);
                }}
              />
            </Button>
          <Button variant='outlined' color='secondary' size='small' onClick={() => removeImage(i.id)}>
            Remove Image
          </Button>
          <img
            style={{ marginLeft: '5px', height: '30px', width: '30px' }}
            src={i.image}
          >
          </img>
        </Box>
      ))}
      <br></br>
      {props.images.length < 15 && (
        <Button variant='outlined' onClick={(e) => {
          e.preventDefault();
          addImage();
        }}
        >
          Add Another Image
        </Button>
      )}
    </>
  );
}

export default AddImages;
