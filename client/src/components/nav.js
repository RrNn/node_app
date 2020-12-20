import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import BookList from 'components/bookList';
import AddBook from 'components/addBook.js';
import Authors from 'components/authors';

export default function Routes() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <NavLink exact activeClassName="active-link" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active-link" to="/authors">
              Authors
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="app-wrapper">
        <Switch>
          <Route exact path="/">
            <>
              <BookList />
              <AddBook />
            </>
          </Route>
          <Route path="/authors">
            <Authors />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
