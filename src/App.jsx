import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ListView } from './views/ListView';
import { CreateView } from './views/CreateView';
import { EditView } from './views/EditView';
import { ApolloProvider } from '@apollo/react-hooks';

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: 'http://localhost:4567/graphql',
  cache,
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path="/list" exact component={ListView} />
        <Route path="/create" component={CreateView} />
        <Route path="/edit/:bookId" exact component={EditView} />
        <Redirect exact from="/" to="list" />
      </Switch>
    </Router>
  </ApolloProvider>
);

export default App;
