import React from "react";
import Sidebar from "./Sidebar";
import {
  Menu,
  GridView,
  Category,
  Article,
  ShoppingCart,
  AirportShuttle,
  AttachMoney,
  Inventory,
  PersonOutline,
  Groups,
  PowerSettingsNew,
} from "@mui/icons-material";
import Customers from "./Customers";
import { Route,Switch } from "react-router-dom";
function Dashboard() {
  const [openOnHover, setOpenOnHover] = React.useState(true);
  const toggleOpenOnHover = () => setOpenOnHover(!openOnHover);

  const links = [
    {
      to: "/",
      label: "Dashboard",
      icon: <GridView />,
    },
    {
      to: "/create-bill",
      label: "Create Bill",
      icon: <Article />,
    },
    {
      to: "/items",
      label: "Items / Services",
      icon: <ShoppingCart />,
    },
    {
      to: "/sales",
      label: "Revenu/Payments",
      icon: <AttachMoney />,
    },
    {
      to: "/sales",
      label: "My Gateway",
      icon: <Inventory />,
    },
    {
      to: "/sales",
      label: "Staff",
      icon: <PersonOutline />,
    },
    {
      to: "/customers",
      label: "Customers",
      icon: <Groups />,
    },
    {
      to: "/logout",
      label: "Logout",
      icon: <PowerSettingsNew />,
    },
  ];

  return (
    <Sidebar
      logo={<img src="NewFolder/logo.png" style={{ width: "100%" }} />}
      name=""
      links={links}
      toggleOpenOnHover={toggleOpenOnHover}
      openOnHover={openOnHover}
    >
      <Switch>
      <Route path="/customers" component={Customers} /></Switch>
    </Sidebar>
  );
}

export default Dashboard;
