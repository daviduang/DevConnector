import "./App.css";
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Imported components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Routes from "./components/routing/Routes";

// Redux (reducers)
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

/**
 * Set auth token to req header if there is one
 */
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* Navigation bar */}
          <Navbar />
          {/* Home route */}
          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <Routes></Routes>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
