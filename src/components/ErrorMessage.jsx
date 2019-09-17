import React from 'react';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const ErrorMessage = ({ error }) => (
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
    <SnackbarContent
      style={{ backgroundColor: 'red' }}
      aria-describedby="error-snackbar"
      message={
        <span data-testid="errorMessage" id="error-snackbar">
          {error.message}
        </span>
      }
    />
  </div>
);

export default ErrorMessage;
