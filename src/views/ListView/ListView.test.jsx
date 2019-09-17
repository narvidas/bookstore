import React from 'react';
import { render, wait, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import faker from 'faker';
import { ApolloClient } from 'apollo-boost';
import { MockedProvider } from '@apollo/react-testing';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ListView, { GET_BOOKS } from './ListView';

const mockBook = () => {
  return {
    bookId: faker.random.number(),
    title: faker.commerce.productName(),
    author: faker.name.findName(),
    price: faker.random.number(),
  };
};
const mockBooks = [...Array(4)].map(mockBook);

const mock = {
  request: {
    query: GET_BOOKS,
  },
  result: {
    data: {
      books: mockBooks,
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
    <MockedProvider mocks={[mock]} addTypename={false}>
      <Router history={history}>
        <ListView history={history} />
      </Router>
    </MockedProvider>,
  );
};

describe('List view', () => {
  test('should display loading state ', () => {
    const { getByTestId } = renderView();

    getByTestId('spinner');
  });

  test('should display all books with all the available properties, id, title, authors and price', async () => {
    const { findByTestId, getByText, debug } = renderView();

    await findByTestId('bookList');

    mockBooks.forEach(mockBook => {
      getByText(mockBook.bookId.toString(), { exact: false });
      getByText(mockBook.title, { exact: false });
      getByText(mockBook.author, { exact: false });
      getByText(mockBook.price.toFixed(2), { exact: false });
    });
  });

  test('each record should have an edit icon that leads to the Edit View', async () => {
    const { getAllByTestId, findAllByTestId } = renderView();

    const [bookList] = await findAllByTestId('bookList');
    const editIcons = getAllByTestId('editIcon');

    expect(editIcons.length).toEqual(mockBooks.length);

    fireEvent.click(editIcons[0]);

    expect(history.push).toHaveBeenCalledWith(`/edit/${mockBooks[0].bookId}`);
  });

  test('each record should have a checkbox which when selected provides a real-time display of how many books are selected', async () => {
    const { getByText, getAllByTestId, findAllByTestId } = renderView();

    const [bookList] = await findAllByTestId('bookList');
    const checkBoxes = getAllByTestId('checkBox');

    expect(checkBoxes.length).toEqual(mockBooks.length);

    expect(getByText('Books selected: 0', { exact: false }));
    fireEvent.click(checkBoxes[0]);
    fireEvent.click(checkBoxes[1]);
    fireEvent.click(checkBoxes[2]);
    fireEvent.click(checkBoxes[3]);
    expect(getByText('Books selected: 4', { exact: false }));

    // Ensure we can un-tick
    fireEvent.click(checkBoxes[0]);
    expect(getByText('Books selected: 3', { exact: false }));
  });

  test('each record should have a checkbox which when selected provides a real-time display of their total price', async () => {
    const { getByText, findAllByTestId, getAllByTestId } = renderView();

    const [bookList] = await findAllByTestId('bookList');
    const checkBoxes = getAllByTestId('checkBox');

    expect(checkBoxes.length).toEqual(mockBooks.length);

    expect(getByText('Total price: £0.00', { exact: false }));
    fireEvent.click(checkBoxes[0]);
    fireEvent.click(checkBoxes[1]);

    const expectedTotalPrice = `Total price: £${(mockBooks[0].price + mockBooks[1].price).toFixed(2)}`;
    expect(getByText(expectedTotalPrice));

    // Ensure we can un-tick
    fireEvent.click(checkBoxes[1]);
    const expectedFirstBookPrice = `Total price: £${mockBooks[0].price.toFixed(2)}`;
    expect(getByText(expectedFirstBookPrice));
  });

  test('should have a “Create New” button that will drive the user to the Create View.', async () => {
    const { findAllByTestId, getByTestId } = renderView();

    const [bookList] = await findAllByTestId('bookList');
    const createButton = getByTestId('createButton');

    fireEvent.click(createButton);

    expect(history.push).toHaveBeenCalledWith(`/create`);
  });
});
