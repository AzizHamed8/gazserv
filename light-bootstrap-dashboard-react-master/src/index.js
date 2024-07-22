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

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/details/:id" component={Details} />
      <Route path="/detailsP" component={DetailsP} />
      <Route path="/addChauf/:id?" component={AddChauf} /> {/* Handle both adding and updating */}
      <Route path="/addCamion/:id?" component={AddCamion} />
      <Route path="/addClient" component={AddClient} />
      <Route path="/addProg" component={AddProg} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </Router>,
);
