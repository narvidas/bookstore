import React, { memo } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TypoGraphy from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Header = memo(({ onCreate, selectedBooks }) => {
  const calculateTotalPrice = () =>
    selectedBooks
      .map(book => book.price)
      .reduce((a, b) => a + b, 0)
      .toFixed(2);

  return (
    <AppBar color="primary" position="static">
      <Toolbar>
        <Grid container justify="space-between">
          <Grid item style={{ marginTop: 'auto', marginBottom: 'auto' }}>
            <TypoGraphy variant="h4" color="inherit">
              Bookstore
            </TypoGraphy>
          </Grid>
          <Grid item style={{ marginTop: 'auto', marginBottom: 'auto' }}>
            <Paper style={{ padding: '0.5rem' }}>
              <Typography variant="h6" component="p">
                {`Books selected: ${selectedBooks.length}`}
              </Typography>
            </Paper>
          </Grid>
          <Grid item style={{ marginTop: 'auto', marginBottom: 'auto' }}>
            <Paper style={{ padding: '0.5rem' }}>
              <Typography variant="h6" component="p">
                {`Total price: £${calculateTotalPrice()}`}
              </Typography>
            </Paper>
          </Grid>
          <Grid item style={{ marginTop: 'auto', marginBottom: 'auto' }}>
            <Button data-testid="createButton" variant="contained" color="default" onClick={onCreate}>
              Create new
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
