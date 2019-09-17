import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ApolloClient } from 'apollo-boost';
import { MockedProvider } from '@apollo/react-testing';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import EditView from './EditView';

const history = createMemoryHistory({ initialEntries: ['/'] });
history.push = jest.fn();

afterEach(() => {
  cleanup();
});

const renderView = () => {
  return render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Router history={history}>
        <EditView history={history} />
      </Router>
    </MockedProvider>,
  );
};

describe('Edit view', () => {
  test('should display a form to allow editing of a book', async () => {});

  test('should ensure fields Title, Author and Price are populated with existing book data', async () => {});

  test('should provide a Edit button that submits the change', async () => {});

  test('should provide a Cancel button navigates back to list', async () => {});
});
