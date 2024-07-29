import Dashboard from "views/Dashboard.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Details from "views/Details";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/chauffeurs",
    name: "Chauffeurs",
    icon: "nc-icon nc-badge",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/camion",
    name: "Camions",
    icon: "nc-icon nc-delivery-fast",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/client",
    name: "Clients",
    icon: "nc-icon nc-single-02",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/programme",
    name: "Programme",
    icon: "nc-icon nc-notes",
    component: Icons,
    layout: "/admin"
  },
  {
    upgrade: true,
    path: "/logout",
    name: "Deconnection",
    icon: "nc-icon nc-button-power",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/chauffeurs/details/:id",
    component: Details,
    layout: "/admin",
  },
];

export default dashboardRoutes;
