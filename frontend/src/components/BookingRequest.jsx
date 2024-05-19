import React from 'react';

import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

import { apiCallPut } from '../helpers';

const BookingRequest = (props) => {
  const acceptBooking = async () => {
    props.setRequestStatusChanged(true)
    await apiCallPut(`bookings/accept/${props.id}`, {}, props.token);
  }

  const declineBooking = async () => {
    props.setRequestStatusChanged(true)
    await apiCallPut(`bookings/decline/${props.id}`, {}, props.token);
  }

  return (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        maxWidth: '650px',
        margin: '10px 0'
      }}>
        <Typography>Booking made by {props.owner} from {props.dateRange.start} to {props.dateRange.end}</Typography>
        <Button color='primary' variant='contained' onClick={acceptBooking}>Accept</Button>
        <Button color='secondary' variant='contained' onClick={declineBooking}>Decline</Button>
      </div>
      <hr />
    </>
  )
}

export default BookingRequest;
