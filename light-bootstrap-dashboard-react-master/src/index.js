import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0';
import './assets/css/demo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import AdminLayout from 'layouts/Admin.js';
import Details from './views/Details';
import DetailsP from './views/DetailsP';
import AddChauf from './views/AddChauf';
import AddCamion from './views/AddCamion';
import AddClient from './views/AddClient';
import AddProg from './views/AddProg';
import Login from './views/Login'; // Import your Login component
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component
import { AuthProvider } from './auth/auth-context'; // Import AuthProvider
import LogoutButton from './views/Icons';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <AuthProvider>
      <Switch>
        <Route path="/login" component={Login} /> {/* Public route */}
        <PrivateRoute path="/admin/dashboard" component={AdminLayout} />
        <PrivateRoute path="/details/:id" component={Details} />
        <PrivateRoute path="/detailsP/:id?" component={DetailsP} />
        <PrivateRoute path="/addChauf/:id?" component={AddChauf} />
        <PrivateRoute path="/addCamion/:id?" component={AddCamion} />
        <PrivateRoute path="/addClient/:id?" component={AddClient} />
        <PrivateRoute path="/addProg/:id?" component={AddProg} />
        <PrivateRoute path="/logout" component={LogoutButton} /> {/* Ajoutez cette ligne pour la route de déconnexion */}
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </AuthProvider>
  </Router>
);
