import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TypoGraphy from "@material-ui/core/Typography";
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
    <AppBar color="primary" position="static">
      <Toolbar>
        <TypoGraphy variant="title" color="inherit">
          Bookstore
        </TypoGraphy>
      </Toolbar>
    </AppBar>
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
