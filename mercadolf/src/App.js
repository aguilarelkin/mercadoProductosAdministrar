import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Create from './components/Create';
import Home from './components/Home';
import { BrowserRouter, HashRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { isAutenticated, hasRole } from './auth/auth.authenticated';
import { Protected } from './interceptor/Protected';
import Authorized from './components/Auth';

import Logout from './components/Logout';


function App() {
  const [user, setUser] = useState("");
  const [sesion, setSesion] = useState(false);
  const [sesiona, setSesiona] = useState(false);
  const [roles, setRoles] = useState([]);
  //const history = useNavigate();
  let _token;
  //56:

  useEffect(
    () => {
      setSesion(isAutenticated());
      //setSesiona(isAutenticatedAu());
      //  getRoles();
    }, []
  );


  return (
    <>
      <BrowserRouter>
        {//console.log(" ad " + sesion)
        }
        {//console.log(roles.includes('ROLE_ADMIN', 'ROLE_USER'))
        }
        < Routes>
          <Route path='/authorized' element={
            <Authorized />
          }
          />
          <Route path='/logout' element={
            <Logout />
          }
          />

          <Route path='/' element={
            <Protected sesion={sesion} redirectTo="/">
              <Login />
            </Protected>
          } />

          <Route path='/create/:dato' element={
            <Protected sesion={sesion} user={['ROLE_ADMIN']} redirectTo="/">
              <Create />
            </Protected>} />

          <Route path='/home' element={
            <Protected sesion={sesion} user={['ROLE_ADMIN', 'ROLE_USER']} redirectTo="/">
              <Home />
            </Protected>
          } />

          <Route path='/home/page/:page' element={
            <Protected sesion={sesion} user={['ROLE_ADMIN', 'ROLE_USER']} redirectTo="/">
              <Home />
            </Protected>
          } />

        </Routes>
      </BrowserRouter>
    </>
  );
}



export default App;
