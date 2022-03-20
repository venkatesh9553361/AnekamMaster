import React from "react";
import Sidebar from "./Sidebar";
import { Menu, GridView, Category, Article, ShoppingCart, AirportShuttle, AttachMoney, Inventory, PersonOutline, Groups, PowerSettingsNew } from "@mui/icons-material";
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
      to: "/sales",
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
    ></Sidebar>
  );
}

export default Dashboard;
