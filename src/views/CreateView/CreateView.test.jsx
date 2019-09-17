import React from 'react';
import { render, wait, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import faker from 'faker';
import { ApolloClient } from 'apollo-boost';
import { MockedProvider } from '@apollo/react-testing';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CreateView, { CREATE_BOOK } from './CreateView';

const getMockBook = () => {
  return {
    bookId: faker.random.number(),
    title: faker.commerce.productName(),
    author: faker.name.findName(),
    price: faker.random.number(),
  };
};

const mockBook = getMockBook();

const createBookMock = {
  request: {
    query: CREATE_BOOK,
    variables: {
      title: mockBook.title,
      author: mockBook.author,
      price: mockBook.price,
    },
  },
  result: {
    data: {
      book: mockBook,
    },
  },
};

const history = createMemoryHistory({ initialEntries: ['/'] });
history.push = jest.fn();

afterEach(() => {
  cleanup();
});

const renderView = () => {
  return render(
    <MockedProvider mocks={[createBookMock]} addTypename={false}>
      <Router history={history}>
        <CreateView history={history} />
      </Router>
    </MockedProvider>,
  );
};

describe('Create view', () => {
  test('should display a form to allow the creation of a book', async () => {
    const { findByTestId, getByTestId } = renderView();

    await findByTestId('createForm');
    getByTestId('titleField');
    getByTestId('authorField');
    getByTestId('priceField');
  });

  test('should ensure required fields are Title, Author and Price, and cannot submit if not provided', async () => {
    const { findByTestId, getByTestId } = renderView();

    const form = await findByTestId('createForm');
    const title = getByTestId('titleField');
    const author = getByTestId('authorField');
    const price = getByTestId('priceField');
    const createButton = getByTestId('createButton');

    expect(title).toHaveAttribute('required');
    expect(author).toHaveAttribute('required');
    expect(price).toHaveAttribute('required');

    fireEvent.click(createButton);
    expect(history.push).not.toHaveBeenCalled();
  });

  test('should provide a Create button that submits a new book', async () => {
    const { findByTestId, getByTestId } = renderView();

    await findByTestId('createForm');
    const title = getByTestId('titleField');
    const author = getByTestId('authorField');
    const price = getByTestId('priceField');
    const createButton = getByTestId('createButton');

    await wait(() => {
      fireEvent.change(title, {
        target: { value: mockBook.title },
      });
      fireEvent.change(author, {
        target: { value: mockBook.author },
      });
      fireEvent.change(price, {
        target: { value: mockBook.price },
      });
    });

    fireEvent.click(createButton);

    expect(history.push).toHaveBeenCalledWith(`/`);
  });

  test('should provide a Cancel button navigates back to list', async () => {
    const { findByTestId, getByTestId } = renderView();

    await findByTestId('createForm');
    const cancelButton = getByTestId('cancelButton');

    fireEvent.click(cancelButton);

    expect(history.push).toHaveBeenCalledWith(`/`);
  });
});
