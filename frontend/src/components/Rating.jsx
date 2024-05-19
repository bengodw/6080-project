import React from 'react';

import MuiRating from '@mui/material/Rating';
import { Typography } from '@mui/material';

const Rating = (props) => {
  const calculateRating = () => {
    const scores = props.reviews.map((i) => i.score);
    if (scores.length === 0) {
      return 0;
    } else if (scores.length === 1) {
      return scores[0];
    } else {
      return (scores.reduce((a, b) => a + b) / scores.length);
    }
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    }}>
      <MuiRating name="read-only" value={Math.round(calculateRating())} readOnly /> &nbsp;
      <Typography>
        {props.reviews.length} {(props.reviews.length === 1) ? 'review' : 'reviews'}
      </Typography>
    </div>
  )
}

export default Rating;
