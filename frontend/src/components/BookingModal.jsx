import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider'

import { Calendar, DateObject } from 'react-multi-date-picker'

import { apiCallPost } from '../helpers'

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

const BookingModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const handleConfirmOpen = () => setConfirmOpen(true);
  const handleConfirmClose = () => setConfirmOpen(false);

  const [values, setValues] = React.useState(
    [new DateObject().set({ day: 1 }), new DateObject().set({ day: 3 })],
  )

  const valuesToJSON = () => {
    const startDate = new Date(values[0].year, values[0].month.index, values[0].day)
    const endDate = new Date(values[1].year, values[1].month.index, values[1].day)
    const numDays = values[1].dayOfBeginning - values[0].dayOfBeginning
    const ret = {
      dateRange: {
        start: startDate.toJSON(),
        end: endDate.toJSON()
      },
      totalPrice: numDays * props.price
    }
    return ret
  }

  const makeBooking = async () => {
    const data = await apiCallPost(`bookings/new/${props.listingId}`, valuesToJSON(), props.token);
    if (data.error) {
      alert(data.error);
    } else {
      handleConfirmOpen();
      props.setBookingsChanged(true);
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>Make Booking</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select the date ranges for when you want to book
          </Typography>
          <Divider sx={{ margin: '20px 0px' }}/>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', fontFamily: 'arial' }}>
            <Calendar
              value={values}
              onChange={setValues}
              range
            />
          </Box>
          <Divider sx={{ margin: '20px 0px' }}/>
          <Button
            onClick={() => {
              makeBooking();
              handleClose();
            }}
          >
            Make Booking
          </Button>
        </Box>
      </Modal>
      <Modal
        open={confirmOpen}
        onClose={handleConfirmClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Booking confirmed
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Congrats! You are going on an awesome holiday!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default BookingModal
