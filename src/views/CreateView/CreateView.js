import React, { useState, memo } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ErrorMessage from 'components/ErrorMessage';

export const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $author: String!, $price: Float!) {
    createBook(title: $title, author: $author, price: $price) {
      bookId
      title
      author
      price
    }
  }
`;

export const CreateView = memo(({ history }) => {
  const [createBook, { error }] = useMutation(CREATE_BOOK);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');

  const goHome = () => history.push('/');

  const handleSubmit = e => {
    e.preventDefault();
    if (!title || !author || !price) return;

    createBook({ variables: { title, author, price: parseInt(price) } });
    goHome();
  };

  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <Typography variant="h4">Create Book</Typography>
      <form autoComplete="off" onSubmit={handleSubmit} data-testid="createForm">
        <Grid container direction="column">
          <Grid item>
            <TextField
              style={{ width: '20rem' }}
              id="title"
              inputProps={{ 'data-testid': 'titleField' }}
              required
              label="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: '20rem' }}
              id="author"
              inputProps={{ 'data-testid': 'authorField' }}
              required
              label="Author"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: '20rem' }}
              id="price"
              inputProps={{ 'data-testid': 'priceField' }}
              required
              label="Price"
              value={price}
              onChange={e => setPrice(e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <Button
              data-testid="cancelButton"
              color="primary"
              type="button"
              onClick={goHome}
              style={{ marginRight: '1rem' }}
            >
              Cancel
            </Button>
            <Button data-testid="createButton" variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
});

export default CreateView;
