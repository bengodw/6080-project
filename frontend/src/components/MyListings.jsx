import React from 'react';

import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

import ListingCard from './ListingCard';
import { apiCallGet } from '../helpers';
import AddListingModal from './AddListingModal';

const MyListings = (props) => {
  const [listings, setListings] = React.useState([]);
  const [listingsChanged, setListingsChanged] = React.useState(false);

  const getMyListings = async () => {
    const data = await apiCallGet('listings', '', '');
    if (data.error) {
      alert(data.error);
      return [];
    } else {
      const myListings = data.listings.filter((i) => isMyListing(i));
      const myFullListings = await Promise.all(
        myListings.map(async (i) => {
          const data2 = await apiCallGet(`listings/${i.id}`, '', props.token);
          data2.listing.id = i.id;
          return data2.listing;
        })
      )
      return myFullListings;
    }
  }

  const isMyListing = (listing) => {
    if (listing.owner === props.email) {
      return true;
    } else {
      return false;
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      if (props.token) {
        try {
          const newListings = await getMyListings();
          setListings(newListings);
          setListingsChanged(false);
        } catch (error) {
          alert(error);
        }
      }
    };
    fetchData();
  }, [listingsChanged, props.token]);

  return (
    <>
      <Typography variant='h3'>
      My Listings
      </Typography>

      <AddListingModal token={props.token} setListingsChanged={setListingsChanged}/>

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
            amenities={(listing.metadata).amenities}
            price={listing.price}
            reviews={listing.reviews}
            myListing='true'
            published={listing.published}
            token={props.token}
            setListingsChanged={setListingsChanged}
          />
        ))}
      </Box>
    </>
  )
}

export default MyListings;
