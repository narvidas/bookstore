import React from 'react';
import { render, wait, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import faker from 'faker';
import { ApolloClient } from 'apollo-boost';
import { MockedProvider } from '@apollo/react-testing';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import EditView, { GET_BOOK, EDIT_BOOK } from './EditView';

console.warn = () => {};

const getMockBook = () => {
  return {
    bookId: faker.random.number(),
    title: faker.commerce.productName(),
    author: faker.name.findName(),
    price: faker.random.number(),
  };
};

const mockBook = getMockBook();
const newMockBook = getMockBook();
newMockBook.bookId = mockBook.bookId;

const getBookMock = {
  request: {
    query: GET_BOOK,
    variables: {
      bookId: mockBook.bookId,
    },
  },
  result: {
    data: {
      book: mockBook,
    },
  },
};

const editBookMock = {
  request: {
    query: EDIT_BOOK,
    variables: {
      bookId: newMockBook.bookId,
      title: newMockBook.title,
      author: newMockBook.author,
      price: newMockBook.price,
    },
  },
  result: {
    data: {
      book: newMockBook,
    },
  },
};

const history = createMemoryHistory({ initialEntries: ['/'] });
history.push = jest.fn();

const match = {
  params: {
    bookId: mockBook.bookId,
  },
};

afterEach(() => {
  cleanup();
});

const renderView = () => {
  return render(
    <MockedProvider mocks={[getBookMock, editBookMock]} addTypename={false}>
      <Router match={match} history={history}>
        <EditView match={match} history={history} />
      </Router>
    </MockedProvider>,
  );
};

describe('Edit view', () => {
  test('should display loading state', () => {
    const { getByTestId } = renderView();

    getByTestId('spinner');
  });

  test('should display error state when error is thrown', async () => {
    const errorMock = {
      request: {
        query: GET_BOOK,
        variables: {
          bookId: mockBook.bookId,
        },
      },
      result: {
        error: new Error(),
      },
    };

    const { findByTestId } = render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <EditView />
      </MockedProvider>,
    );

    const errorMessageComponent = await findByTestId('errorMessage');
    expect(errorMessageComponent).toHaveTextContent('error');
  });

  test('should display a form to allow editing of a book', async () => {
    const { findByTestId, getByText } = renderView();

    await findByTestId('editForm');
    await findByTestId('titleField');
    await findByTestId('authorField');
    await findByTestId('priceField');
  });

  test('should ensure fields Title, Author and Price are populated with existing book data', async () => {
    const { findByTestId, debug } = renderView();

    const title = await findByTestId('titleField');
    const author = await findByTestId('authorField');
    const price = await findByTestId('priceField');

    expect(title).toHaveValue(mockBook.title);
    expect(author).toHaveValue(mockBook.author);
    expect(price).toHaveValue(mockBook.price.toString());
  });

  test('should provide a Edit button that submits the change', async () => {
    const { findByTestId, getByTestId } = renderView();

    await findByTestId('editForm');
    const title = getByTestId('titleField');
    const author = getByTestId('authorField');
    const price = getByTestId('priceField');
    const editButton = getByTestId('editButton');

    await wait(() => {
      fireEvent.change(title, {
        target: { value: newMockBook.title },
      });
      fireEvent.change(author, {
        target: { value: newMockBook.author },
      });
      fireEvent.change(price, {
        target: { value: newMockBook.price },
      });
    });

    fireEvent.click(editButton);

    expect(history.push).toHaveBeenCalledWith(`/`);
  });

  test('should provide a Cancel button navigates back to list', async () => {
    const { findByTestId, getByTestId } = renderView();

    await findByTestId('editForm');
    const cancelButton = getByTestId('cancelButton');

    fireEvent.click(cancelButton);

    expect(history.push).toHaveBeenCalledWith(`/`);
  });
});
