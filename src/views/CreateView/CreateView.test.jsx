import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ApolloClient } from 'apollo-boost';
import { MockedProvider } from '@apollo/react-testing';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CreateView from './CreateView';

const history = createMemoryHistory({ initialEntries: ['/'] });
history.push = jest.fn();

afterEach(() => {
  cleanup();
});

const renderView = () => {
  return render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Router history={history}>
        <CreateView history={history} />
      </Router>
    </MockedProvider>,
  );
};

describe('Create view', () => {
  test('should display a form to allow the creation of a book', async () => {});

  test('should ensure required fields are Title, Author and Price.', async () => {});

  test('should provide a Create button that submits a new book', async () => {});

  test('should provide a Cancel button navigates back to list', async () => {});
});
