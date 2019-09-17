import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = () => (
  <div
    style={{
      display: 'flex',
      position: 'absolute',
      height: '100vh',
      width: '100vw',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CircularProgress data-testid="spinner" />
  </div>
);

export default Spinner;
