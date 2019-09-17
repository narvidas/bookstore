import React, { useState, useEffect, memo } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import List from '@material-ui/core/List';
import ErrorMessage from 'components/ErrorMessage';
import Spinner from 'components/Spinner';
import Book from './Book';
import Header from './Header';

export const GET_BOOKS = gql`
  {
    books {
      bookId
      title
      author
      price
    }
  }
`;

export const ListView = memo(({ history }) => {
  const { loading, error, data, refetch } = useQuery(GET_BOOKS);
  const [selectedBooks, setSelectedBooks] = useState([]);

  useEffect(() => {
    refetch();
  }, []);

  const handleSelect = book => {
    const bookSet = new Set(selectedBooks);
    bookSet.has(book) ? bookSet.delete(book) : bookSet.add(book);
    setSelectedBooks(Array.from(bookSet));
  };

  const handleCreate = () => history.push('/create');
  const handleEdit = bookId => history.push(`/edit/${bookId}`);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <Header selectedBooks={selectedBooks} onCreate={handleCreate} />
      <List data-testid="bookList">
        {data.books.map(book => (
          <Book key={book.bookId} book={book} onSelect={handleSelect} onEdit={handleEdit} />
        ))}
      </List>
    </>
  );
});

export default ListView;
