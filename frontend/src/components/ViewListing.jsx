import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import PaidIcon from '@mui/icons-material/Paid';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';

import IconText from './IconText';
import Rating from './Rating';
import BookingModal from './BookingModal';
import Review from './Review';
import ListingImages from './ListingImages';
import ReviewModal from './ReviewModal';
import BookingInfo from './BookingInfo'

import { apiCallGet } from '../helpers';
import { useParams } from 'react-router-dom';

const ViewListing = (props) => {
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
  const [images, setImages] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);

  const [bookings, setBookings] = React.useState([]);
  const [email, setEmail] = React.useState()

  const [reviewsChanged, setReviewsChanged] = React.useState(false);

  const [canReview, setCanReview] = React.useState(null);
  const [bookingsChanged, setBookingsChanged] = React.useState(false);

  const id = useParams().id;

  const getListing = async () => {
    const data = await apiCallGet(`listings/${id}`, '', props.token);
    return data;
  }

  // Get email
  React.useEffect(() => {
    const checkEmail = localStorage.getItem('email');
    if (checkEmail) {
      setEmail(checkEmail);
    }
  }, [])

  // Get Listing Details
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const listing = await getListing();
        setDetails(listing.listing);
      } catch (error) {
        alert(error);
      }
    };

    fetchData();
    setReviewsChanged(false);
  }, [reviewsChanged]);

  // Fetch bookings
  React.useEffect(async () => {
    if (props.token && email) {
      const bookingsData = await apiCallGet('bookings', props.token, '');
      const allBookings = bookingsData.bookings;
      setBookings([]);
      for (const booking of allBookings) {
        if ((booking.owner === email) &&
          (booking.listingId === id)) {
          setBookings((prevBookings) => [...prevBookings, booking]);
          if (booking.status === 'accepted') {
            setCanReview(booking.id);
          }
        }
        setBookingsChanged(false);
      }
    }
  }, [props.token, email, bookingsChanged])

  const setDetails = (listing) => {
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
    setReviews(listing.reviews)
  }

  const numBeds = () => {
    return bedrooms.reduce((totalBeds, bedroom) => Number(totalBeds) + Number(bedroom.beds), 0);
  }

  return (
    <>
      <Typography variant='h3'>
        {title}
      </Typography>
      <Typography variant='h6'>
        {street}, {city}, {state}, {postcode}, {country}
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: '420px',
          display: 'flex',
          justifyContent: 'space-around',
          borderRadius: '25px',
          overflow: 'hidden'
        }}
      >
        <Box
          component="img"
          src={thumbnail}
          sx={{
            minWidth: '100%',
            objectFit: 'cover'
          }}
        />
      </Box>
      <br></br>
      <Typography variant='h5'>
        {type}
      </Typography>
      <Rating reviews={reviews} />
      <IconText icon={BedIcon}>
        {bedrooms.length} bedrooms
      </IconText>
      <IconText icon={LocalHotelIcon}>
        {numBeds()} beds
      </IconText>
      <IconText icon={BathtubIcon}>
        {bathrooms} bathrooms
      </IconText>
      <IconText icon={PaidIcon}>
        ${price} per night
      </IconText>
      <br></br>
      <Typography variant="h6">
        Amenities
      </Typography>
      <Typography variant="body1">
        {amenities.map((amenity) => (
          <li key={amenity.name}>
            {amenity.name}
          </li>
        ))}
      </Typography>
      <br />
      <Box>
        <Typography variant="h6">
          Your Bookings
        </Typography>
      </Box>
      {props.token &&
        <>
          <BookingModal
            token={props.token}
            listingId={id}
            price={price}
            setBookingsChanged={setBookingsChanged}
          />
          <Box
            tabIndex='0'
            sx={{
              padding: 2,
              boxShadow: 2,
              borderRadius: '6px',
              maxHeight: '250px',
              overflow: 'scroll'
            }}
          >
            {bookings.length === 0 && (
              <Typography variant='body2'>
                You have not made any bookings here
              </Typography>
            )}
            {bookings.length !== 0 && (
              bookings.map((booking) => (
                <BookingInfo
                  key={booking.id}
                  booking={booking}
                />
              ))
            )}
          </Box>
        </>
      }
      {!props.token &&
        <Typography variant='body2'>
          Log in to make a booking
        </Typography>
      }
      <br />
      <Typography variant="h6">
        Reviews
      </Typography>
      {(canReview) &&
        <ReviewModal
          token={props.token}
          listingId={id}
          email={email}
          bookingId={canReview}
          setReviewsChanged={setReviewsChanged}
        />
      }

      <Box
        tabIndex='0'
        sx={{
          padding: 2,
          boxShadow: 2,
          borderRadius: '6px',
          maxHeight: '250px',
          overflow: 'scroll'
        }}
      >
        {reviews.length === 0 && (
          <Typography variant='body2'>
            No reviews yet...
          </Typography>
        )}
        {reviews.length !== 0 && (
          reviews.map((review, index) => (
            <Review key={index} review={review} />
          ))
        )}
      </Box>
      <br />
      <Box sx={{ width: '100%' }}>
        <Typography variant="h6">
          Photos
        </Typography>
        <ListingImages images={images} />
      </Box>
    </>
  )
}

export default ViewListing;
