import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { Create } from "./views/create";
import { Edit } from "./views/edit";
import { List } from "./views/list";
import { ApolloProvider } from "@apollo/react-hooks";

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: "http://localhost:4567",
  cache
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path="/list" exact component={List} />
        <Route path="/edit/:id" exact component={Edit} />
        <Route path="/create/:id" component={Create} />
        <Redirect exact from="/" to="list" />
      </Switch>
    </Router>
  </ApolloProvider>
);

export default App;
