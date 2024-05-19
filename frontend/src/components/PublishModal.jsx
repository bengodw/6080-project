import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider'

import { Calendar, DateObject } from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'

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

const PublishModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [values, setValues] = React.useState([
    [new DateObject().set({ day: 1 }), new DateObject().set({ day: 3 })],
  ])

  const valuesToJSON = () => {
    const ret = []
    for (const pair of values) {
      if (pair.length === 2) {
        ret.push({
          start: (new Date(pair[0].year, pair[0].month.index, pair[0].day)).toJSON(),
          end: (new Date(pair[1].year, pair[1].month.index, pair[1].day)).toJSON()
        })
      }
    }
    return { availability: ret }
  }

  const publish = async () => {
    const data = await apiCallPut(`listings/publish/${props.listingId}`, valuesToJSON(), props.token);
    if (data.error) {
      alert(data.error);
    } else {
      props.setIsPublished(true);
    }
  }

  return (
    <div>
      <Button onClick={handleOpen} data-test-target="PublishButton">Publish</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select the date ranges when your property will be available
          </Typography>
          <Divider sx={{ margin: '20px 0px' }}/>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', fontFamily: 'arial' }}>
            <Calendar
              value={values}
              onChange={setValues}
              multiple
              range
              plugins={[
                <DatePanel
                  key='datePanel'
                  removeButton={true}
                />
              ]}
            />
          </Box>
          <Divider sx={{ margin: '20px 0px' }}/>
          <Button
            onClick={() => {
              publish();
              handleClose();
            }}
          >
            Publish
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default PublishModal
