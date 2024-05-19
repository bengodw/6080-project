import React from 'react';

import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box'

const BookingInfo = (props) => {
  const JSONToNormal = (JSONDate) => {
    return (new Date(JSONDate)).toLocaleDateString()
  }

  return (
    <Box>
      <Typography variant='body1'>
        {JSONToNormal(props.booking.dateRange.start) +
        ' to ' +
        JSONToNormal(props.booking.dateRange.end)}
      </Typography>
      <Typography variant='body2'>
        {props.booking.status}
      </Typography>
      <Divider sx={{ margin: '8px 0px' }} />
    </Box>
  )
}

export default BookingInfo;
