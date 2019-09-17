import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ApolloClient } from 'apollo-boost';
import { MockedProvider } from '@apollo/react-testing';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ListView from './ListView';

const history = createMemoryHistory({ initialEntries: ['/'] });
history.push = jest.fn();

afterEach(() => {
  cleanup();
});

const renderView = () => {
  return render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Router history={history}>
        <ListView history={history} />
      </Router>
    </MockedProvider>,
  );
};

describe('List view', () => {
  test('should display error state when error is thrown', async () => {});

  test('should display all books with all the available properties, id, title, authors and price', async () => {});

  test('each record should have an edit icon that leads to the Edit View', async () => {});

  test('each record should have a checkbox which when selected provides a real-time display of how many books are selected', async () => {});

  test('each record should have a checkbox which when selected provides a real-time display of their total price', async () => {});

  test('should have a “Create New” button that will drive the user to the Create View.', async () => {});
});
