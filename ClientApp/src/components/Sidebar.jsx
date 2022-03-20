import { useState } from "react";
import "../styles/sidebar.css";
import { Person, PowerSettingsNew } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import {
  Divider,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Icon,
  AppBar,
  Box,
  Toolbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from 'react-redux';
import { removeUser } from "../redux/state/authSlice";




const useStyles = makeStyles(() => ({
  navLink: {
    all: "unset",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: "10px 0px 0px 0px",
  },
  navLinkActive: {
    all: "unset",
    backgroundColor: "#E4E9F7",
    color: "#00963F",
    padding: "3px 4px",
    borderRadius: "30px 0px 0px 30px",
    margin: "10px auto 10px 0",
    marginTop: "-1px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "& svg": {
      width: "40px",
      height: "40px",
      padding: "5px",
      backgroundColor: "#00963F",
      borderRadius: "50%",
    },
  },
  LinkBody: {
    width: "100%",
    fontSize: "15px",
    color: "white",
    cursor: "pointer",
  },
  linkName: {
    marginLeft: "10px",
    "& :hover": {
      transform: "translateX(10px)",
      transition: "all 0.5s ease",
    },
  },
  NavBar: {
    backgroundColor: "white",
    color: "black",
    display: "felx",
    justifyContent: "space-between",
  },
  brand: {
    color: "#00963F",
  },
  icon: {
    width: "40px !important",
    height: "40px !important",
    color: "white",
  },
}));

const Sidebar = ({
  logo,
  name,
  links,
  toggleOpenOnHover,
  children,
  openOnHover,
}) => {
  const [isClose, setIsClose] = useState(true);
  const [hoverClose, setHoverClose] = useState(false);
  const toggleIsClose = () => setIsClose(!isClose);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch =  useDispatch();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const signOutUSer = ()=>{
    dispatch(removeUser());
  }
  return (
    <main>
      <aside
        className={isClose ? "sidebar close" : "sidebar"}
        onMouseEnter={
          isClose === true && openOnHover
            ? () => {
                setIsClose(false);
                setHoverClose(true);
              }
            : null
        }
        onMouseLeave={
          hoverClose === true && openOnHover
            ? () => {
                setIsClose(true);
                setHoverClose(false);
              }
            : null
        }
      >
        <section className="logo-details">
          {logo}
          <span className="logo_name">{name}</span>
        </section>
        <Divider />
        <ul className="nav-links">
          {links.map((link, key) => {
            return (
              <div className={classes.LinkBody}>
                <NavLink
                  to={link.to}
                  onClick={() => {
                    setIsClose(false);
                  }}
                  id={link.to}
                  exact
                  key={key}
                  activeClassName={classes.navLinkActive}
                  className={classes.navLink}
                >
                  <Icon className={classes.icon}>{link.icon}</Icon>
                  {!isClose && (
                    <span className={classes.linkName}>{link.label}</span>
                  )}
                </NavLink>
              </div>
            );
          })}
        </ul>
      </aside>
      <section className="home-section">
        <Box>
          <AppBar position="static">
            <Toolbar className={classes.NavBar}>
              <IconButton
                onClick={() => toggleIsClose()}
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h5" className={classes.brand}>
                Anekam Digi Technologies
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt="Remy Sharp" src="Some" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  {" "}
                  <Person /> My Profile
                </MenuItem>
                <MenuItem onClick={signOutUSer}>
                  {" "}
                  <PowerSettingsNew /> Sign Out
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </Box>
        <div>{children}</div>
      </section>
    </main>
  );
};

export default Sidebar;
