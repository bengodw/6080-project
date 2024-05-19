import React from 'react';

import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

import { apiCallGet } from '../helpers';
import ListingCard from './ListingCard';
import Search from './Search'

const LandingScreen = (props) => {
  const [listings, setListings] = React.useState([]);
  const [searchCriteria, setSearchCriteria] = React.useState({
    search: null,
    criteria: 'none',
    min: 0,
    max: 0,
    dates: null
  })

  const getAllListings = async () => {
    const data = await apiCallGet('listings', '', '');
    if (data.error) {
      alert(data.error);
      return [];
    } else {
      const listingsData = data.listings
      const fullListings = await Promise.all(
        listingsData.map(async (i) => {
          const data2 = await apiCallGet(`listings/${i.id}`, ''); // No token needed
          data2.listing.id = i.id;
          return data2.listing;
        })
      )
      const publishedListings = fullListings.filter((i) => (i.published === true));
      const listingsFiltered = filterListings(publishedListings);
      const listingsOrdered = await orderListings(listingsFiltered);
      return listingsOrdered;
    }
  }

  const orderListings = async (ls) => {
    if (searchCriteria.criteria === 'rating-hi' || searchCriteria.criteria === 'rating-lo') {
      return ls;
    }
    if (!props.token) {
      return sortAlphabetically(ls);
    }
    const bookings = await apiCallGet('bookings', props.token, '')
    const bookedListings = [];
    const nonBookedListings = [];
    for (const listing of ls) {
      let hasBooking = false;
      for (const booking of bookings.bookings) {
        if (Number(booking.listingId) === Number(listing.id) &&
          booking.owner === props.email &&
          (booking.status === 'accepted' || booking.status === 'pending')) {
          hasBooking = true;
          break;
        }
      }
      if (hasBooking) {
        bookedListings.push(listing);
      } else {
        nonBookedListings.push(listing);
      }
    }
    return (sortAlphabetically(bookedListings).concat(sortAlphabetically(nonBookedListings)));
  }

  const sortAlphabetically = (ls) => {
    return (ls.slice().sort((a, b) => a.title.localeCompare(b.title)));
  }

  const filterListings = (ls) => {
    switch (searchCriteria.criteria) {
      case 'search':
        return ls.filter((i) => {
          return i.title.toLowerCase().includes(searchCriteria.search.toLowerCase()) || i.address.city.toLowerCase().includes(searchCriteria.search.toLowerCase())
        })
      case 'bedrooms':
        return ls.filter((i) => {
          return ((i.metadata).bedrooms.length >= searchCriteria.min && (i.metadata).bedrooms.length <= searchCriteria.max)
        })
      case 'price':
        return ls.filter((i) => {
          return (Number(i.price) >= Number(searchCriteria.min) && Number(i.price) <= Number(searchCriteria.max))
        })
      case 'date':
        return ls.filter((i) => {
          let valid = false;
          for (const pair of i.availability) {
            if (searchCriteria.dates.start >= pair.start && searchCriteria.dates.end <= pair.end) {
              valid = true;
            }
          }
          return valid;
        })
      case 'rating-hi':
        return sortRatingAscending(ls);
      case 'rating-lo':
        return sortRatingAscending(ls).reverse();
      default:
        return ls;
    }
  }
  const sortRatingAscending = (listings) => {
    const sortedData = listings.sort((a, b) => {
      const ratingA = calculateRating(a.reviews);
      const ratingB = calculateRating(b.reviews);
      return ratingB - ratingA;
    });
    return sortedData;
  }

  const calculateRating = (reviews) => {
    const totalScore = reviews.reduce((sum, review) => sum + review.score, 0);
    return reviews.length > 0 ? totalScore / reviews.length : 0;
  }

  React.useEffect(async () => {
    const newListings = await getAllListings();
    setListings(newListings);
  }, [searchCriteria, props.token])

  return (
    <>
      <Typography variant='h3'>
        Welcome to Airbrb!
      </Typography>

      <Search ssc={setSearchCriteria} />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            id={listing.id}
            thumbnail={listing.thumbnail}
            title={listing.title}
            type={(listing.metadata).type}
            beds={(listing.metadata).beds}
            bathrooms={(listing.metadata).bathrooms}
            bedrooms={(listing.metadata).bedrooms}
            price={listing.price}
            reviews={listing.reviews}
            myListing='false'
            published={listing.published}
            token={props.token}
          />
        ))}
      </Box>
    </>
  )
}

export default LandingScreen;
