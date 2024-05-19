import React from 'react';

import MuiRating from '@mui/material/Rating';
import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box'

const Review = (props) => {
  return (
    <Box>
      <Typography variant='body1'>
        {props.review.name}
      </Typography>
      <MuiRating name="read-only" value={props.review.score} readOnly /> &nbsp;
      <Typography variant='body2'>
        {props.review.comment}
      </Typography>
      <Divider sx={{ margin: '8px 0px' }}/>
    </Box>
  )
}

export default Review;
