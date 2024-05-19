import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useMediaQuery from '@mui/material/useMediaQuery';

const ListingImages = (props) => {
  const isSmall = useMediaQuery('(max-width:600px)');
  const isMedium = useMediaQuery('(min-width:601px) and (max-width:900px)');

  const getCols = () => {
    if (isSmall) {
      return 1;
    } else if (isMedium) {
      return 2;
    } else {
      return 3;
    }
  };

  const getRowHeight = () => {
    return 500;
  };

  return (
    <ImageList
      sx={{ width: '100%', height: 450 }}
      cols={getCols()}
      rowHeight={getRowHeight()}
      tabIndex='0'
    >
      {props.images.map((item) => (
        <ImageListItem key={item.image} sx={{ maxWidth: 500 }}>
          <img
            srcSet={`${item.image}`}
            src={`${item.image}`}
            alt={'listing photo ' + item.id}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ListingImages
