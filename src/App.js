import React from 'react';
import { Redirect, Route, BrowserRouter } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import LoginPage from './pages/LoginPage';
import storage from './lib/storage';

function App() {
  return (
    <BrowserRouter>
      <Route
        exact
        path='/'
        render={(props) =>
          storage.get('id') ? (
            <NavigationBar />
          ) : (
            <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
          )
        }
      />
      <Route path='/auth' component={LoginPage} />
    </BrowserRouter>
  );
}

export default App;
