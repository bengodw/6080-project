import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Rating from './Rating';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import PaidIcon from '@mui/icons-material/Paid';
import BathtubIcon from '@mui/icons-material/Bathtub';
import { Link, useNavigate } from 'react-router-dom'

import IconText from './IconText';
import PublishModal from './PublishModal';

import { apiCallPut, apiCallDelete } from '../helpers'

const ListingCard = (props) => {
  const [isPublished, setIsPublished] = React.useState(props.published);
  const navigate = useNavigate();

  const unpublish = async () => {
    await apiCallPut(`listings/unpublish/${props.id}`, {}, props.token);
  }

  const deleteListing = async () => {
    await apiCallDelete(`listings/${props.id}`, props.token);
    props.setListingsChanged(true);
  }

  const numBeds = () => {
    return props.bedrooms.reduce((totalBeds, bedroom) => Number(totalBeds) + Number(bedroom.beds), 0);
  }

  return (
    <Card sx={{
      flex: '1 0 30%',
      maxWidth: 540,
      minWidth: 250,
      margin: 1
    }}>
      <CardActionArea
        onClick={() => {
          navigate(`/listings/${props.id}`)
        }}
        data-test-target="CardButton"
      >
        <CardMedia
          component="img"
          height="140"
          image={(() => {
            switch (props.thumbnail) {
              case undefined:
                return '/assets/defaultHouse.jpg';
              default:
                return props.thumbnail;
            }
          })()}
          alt="Listing Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.type}
          </Typography>
          <IconText icon={LocalHotelIcon} aria-label="beds">
            {numBeds()}
          </IconText>
          <IconText icon={BathtubIcon} aria-label="bathrooms">
            {props.bathrooms}
          </IconText>
          <Rating reviews={props.reviews} aria-label="star rating"/>
          <IconText icon={PaidIcon} aria-label="price per night">
            ${props.price} per night
          </IconText>
        </CardContent>
      </CardActionArea>
      {props.myListing === 'true' && (
        <CardActions sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button
            size="small"
            color="primary"
            component={Link}
            to={'/myListings/editListing/' + props.id}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="secondary"
            onClick={deleteListing}
          >
            Delete
          </Button>
          <Button
            size="small"
            color="primary"
            component={Link}
            to={'/myListings/viewBookings/' + props.id}
          >
            Bookings
          </Button>
          {!isPublished && (
            <PublishModal
              token={props.token}
              listingId={props.id}
              setIsPublished={setIsPublished}
            />
          )}
          {isPublished && (
            <Button
              size="small"
              color="secondary"
              onClick={() => {
                unpublish();
                setIsPublished(false);
              }}
            >
              Unpublish
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
}

export default ListingCard;
