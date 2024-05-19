import React from 'react';

import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';

const IconText = (props) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    }}>
      <Icon component={props.icon}/> &nbsp;
      <Typography>
        {props.children}
      </Typography>
    </div>
  )
}

export default IconText;
