import React from 'react';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box'

import { apiCallGet } from '../helpers';
import { useParams } from 'react-router-dom';

import BookingRequest from './BookingRequest';

const ViewBookings = (props) => {
  const id = useParams().id;
  const [bookings, setBookings] = React.useState([]);
  const [profit, setProfit] = React.useState(0)
  const [days, setDays] = React.useState(0)
  const [sincePost, setSincePost] = React.useState('')
  const [requestStatusChanged, setRequestStatusChanged] = React.useState(false);
  const [published, setPublished] = React.useState(true);

  const getBookings = async () => {
    const data = await apiCallGet('bookings', props.token, '');
    return (data.bookings.filter((i) => i.listingId === id));
  }

  React.useEffect(async () => {
    if (props.token) {
      let profitCount = 0
      let dayCount = 0
      const bks = await getBookings();

      for (const booking of bks) {
        if (booking.status === 'accepted' &&
          booking.dateRange.start.includes((new Date()).getFullYear())) {
          profitCount += booking.totalPrice
          dayCount += ((new Date(booking.dateRange.end)).getTime() - (new Date(booking.dateRange.start)).getTime()) / (1000 * 3600 * 24)
        }
        booking.dateRange.start = JSONToNormal(booking.dateRange.start)
        booking.dateRange.end = JSONToNormal(booking.dateRange.end)
      }
      setProfit(profitCount)
      setDays(dayCount)
      setBookings(bks)
    }
    setRequestStatusChanged(false);
  }, [props.token, requestStatusChanged])

  React.useEffect(async () => {
    if (props.token) {
      const data = await apiCallGet(`listings/${id}`, props.token, '');
      if (data.listing.postedOn) {
        setPublished(true);
        const postedOn = new Date(data.listing.postedOn)
        const now = new Date()
        let delta = Math.abs(now - postedOn) / 1000;
        const days = Math.floor(delta / 86400);
        delta -= days * 86400;
        const hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        const minutes = Math.floor(delta / 60) % 60;
        setSincePost(`${days} days, ${hours} hours and ${minutes} minutes`)
      } else {
        setPublished(false);
      }
    }
  }, [props.token, requestStatusChanged])

  const JSONToNormal = (JSONDate) => {
    return (new Date(JSONDate)).toLocaleDateString()
  }

  return (
    <div>
      <Typography variant='h3'>
        Bookings
      </Typography>
      <Typography variant='h6'>
        Booking Requests
      </Typography>
      {bookings.filter(i => i.status === 'pending').map((booking) => (
        <BookingRequest
          key={booking.id}
          id={booking.id}
          owner={booking.owner}
          dateRange={booking.dateRange}
          totalPrice={booking.totalPrice}
          listingId={booking.listingId}
          token={props.token}
          setRequestStatusChanged={setRequestStatusChanged}
        >
        </BookingRequest>
      ))}
      <br/>
      <Typography variant='h6'>
        Booking History
      </Typography>
      {bookings.filter(i => i.status !== 'pending').map((booking) => (
        <div key={booking.id}>
          <Typography>Booking request made by {booking.owner} from {booking.dateRange.start} to {booking.dateRange.end} was {booking.status}</Typography>
        </div>
      ))}
      <br />
      <Typography variant='h6'>
        Booking Data
      </Typography>
      {published && <Box>
        <Typography>Total profit this year: ${profit}</Typography>
        <Typography>Total days booked this year: {days}</Typography>
        <Typography>It has been {sincePost} since this listing was posted</Typography>
      </Box>}
      {!published && <Box>
        <Typography>
          Publish this listing to view booking data.
        </Typography>
      </Box>}
    </div>
  )
}

export default ViewBookings;
