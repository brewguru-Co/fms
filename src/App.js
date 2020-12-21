import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, BrowserRouter } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import LoginPage from './pages/LoginPage';
import storage from './lib/storage';
import { checkStatus } from './redux/modules/auth';

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = storage.get('id');
    if (!id) return;

    dispatch(checkStatus());
  }, [dispatch]);

  useEffect(() => {
    if (!auth.loading && auth.error && auth.status !== null) {
      storage.remove('id');
      window.location.href = '/auth/login';
    }
  }, [auth]);

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
