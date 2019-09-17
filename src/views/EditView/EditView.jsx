import React, { useState, useEffect, memo } from 'react';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ErrorMessage from 'components/ErrorMessage';
import Spinner from 'components/Spinner';

export const EDIT_BOOK = gql`
  mutation EditBook($bookId: Int!, $title: String!, $author: String!, $price: Float!) {
    editBook(bookId: $bookId, title: $title, author: $author, price: $price) {
      bookId
      title
      author
      price
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($bookId: Int!) {
    book(bookId: $bookId) {
      bookId
      title
      author
      price
    }
  }
`;

export const EditView = memo(({ match, history }) => {
  const bookId = match && match.params.bookId;
  const getBookResult = useQuery(GET_BOOK, {
    variables: { bookId },
  });
  const [editBook, editBookResult] = useMutation(EDIT_BOOK);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (!getBookResult.error && getBookResult.data) {
      const { title, author, price } = getBookResult.data.book;
      setTitle(title);
      setAuthor(author);
      setPrice(price);
    }
  }, [getBookResult]);

  const goHome = () => history.push('/');

  const handleSubmit = e => {
    e.preventDefault();
    editBook({ variables: { bookId, title, author, price: parseInt(price) } });
    goHome();
  };

  if (getBookResult.loading || editBookResult.loading) return <Spinner />;
  if (getBookResult.error) return <ErrorMessage error={getBookResult.error} />;
  if (editBookResult.error) return <ErrorMessage error={editBookResult.error} />;

  return (
    <>
      <Typography variant="h4">{`Edit "${getBookResult.data.book.title}"`}</Typography>
      <form autoComplete="off" onSubmit={handleSubmit} data-testid="editForm">
        <Grid container direction="column">
          <Grid item>
            <TextField
              style={{ width: '20rem' }}
              id="title"
              inputProps={{ 'data-testid': 'titleField' }}
              required
              value={title}
              placeholder={'Title'}
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
              value={author}
              placeholder={'Author'}
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
              value={price}
              placeholder={'Price'}
              onChange={e => setPrice(e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <Button
              data-testid="cancelButton"
              color="default"
              type="button"
              onClick={goHome}
              style={{ marginRight: '1rem' }}
            >
              Cancel
            </Button>
            <Button data-testid="editButton" color="primary" variant="contained" type="submit">
              Edit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
});

export default EditView;
