import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField';
import MuiRating from '@mui/material/Rating';

import { apiCallPut } from '../helpers';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  margin: 'auto'
};

const ReviewModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [comment, setComment] = React.useState('')
  const [score, setScore] = React.useState(3)

  const submitReview = async () => {
    const data = await apiCallPut(`listings/${props.listingId}/review/${props.bookingId}`,
      {
        review: {
          name: props.email,
          score,
          comment
        }
      },
      props.token);
    if (data.error) {
      alert(data.error);
    } else {
      props.setReviewsChanged(true);
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>Leave Review</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Leave a Review
          </Typography>
          <Divider sx={{ margin: '20px 0px' }} />
          <Typography component="legend">Rating</Typography>
          <MuiRating
            name="simple-controlled"
            value={score}
            onChange={(event, newValue) => {
              setScore(newValue);
            }}
          />
          <Box>
            <TextField
              id="outlined-textarea"
              label="Review"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value)
              }}
              placeholder="Review"
              multiline
            />
          </Box>
          <Divider sx={{ margin: '20px 0px' }} />
          <Button
            onClick={() => {
              submitReview();
              handleClose();
            }}
          >
            Submit Review
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ReviewModal
