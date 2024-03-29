import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import StorefrontIcon from "@mui/icons-material/Storefront";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Tooltip,
  Typography,
  Button,
  Menu,
  IconButton,
  Avatar,
  MenuItem,
} from "@mui/material";
import { setAuthUser, setToken } from "../../appSlice";
import useToggle from "../../hooks/useToggle";
import SideModal from "../../components/SideModal";
import ListItems from "./components/ListItems";
import { LockOpen } from "@mui/icons-material";
import { useLogoutCurentUserMutation } from "../../service/authService";

const navItems = [
  {
    title: "Login",
    link: "/login",
    icon: <LockOpen />,
  },
];

const navItemsAuth = [
  {
    title: "Recipes",
    link: "/recipes",
    icon: <RestaurantMenuIcon />,
  },
];

const navUserSettings = ["Logout"];

function MobileNavBar({
  navItems,
}: {
  navItems: { title: string; link: string; icon: JSX.Element }[];
}) {
  const [value, toggleValue] = useToggle();

  return (
    <>
      <StorefrontIcon sx={{ display: { xs: "flex", sm: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        component={Link}
        to={"/"}
        noWrap
        sx={{
          display: { xs: "flex", sm: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          color: "inherit",
          letterSpacing: ".15rem",
          textDecoration: "none",
          textAlign: "center",
        }}
      >
        Foodie Love
      </Typography>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => toggleValue()}
        sx={{ display: { sm: "none" }, ml: "auto" }}
      >
        <MenuIcon />
      </IconButton>
      <SideModal modalOpen={value} handleToggle={() => toggleValue()}>
        <ListItems handleToggle={() => toggleValue()} listItems={navItems} />
      </SideModal>
    </>
  );
}

function NavBar() {
  const user = useSelector((state: any) => state.app.authUser as any) as any;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [logoutCurrentUser] = useLogoutCurentUserMutation();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (
    evt: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    const target = evt.target as HTMLLIElement;

    if (target && target.innerText.toLowerCase() === "logout") {
      logoutCurrentUser();
      dispatch(setToken(null));
      dispatch(setAuthUser(null));
      navigate("/");
    }

    setAnchorElUser(null);
  };

  const navItemsDisplayed = user !== null ? navItemsAuth : navItems;

  return (
    <AppBar position="static" sx={{ backgroundColor: "#04b597" }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <StorefrontIcon sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            component={Link}
            to={"/"}
            noWrap
            sx={{
              display: { xs: "none", sm: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              letterSpacing: ".15rem",
              textDecoration: "none",
            }}
          >
            Foodie Love
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "end",
              display: { xs: "none", sm: "flex" },
            }}
          >
            {navItemsDisplayed.map((item, idx) => (
              <Button
                key={idx}
                component={Link}
                to={item.link}
                sx={{ color: "#fff", ml: 1 }}
              >
                {item.title}
              </Button>
            ))}
          </Box>
          {user && (
            <Box sx={{ display: "flex", flexGrow: { xs: 1, sm: 0 } }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar
                    alt="foodie-user"
                    src={user && user?.imageUrl ? user.imageUrl : ""}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "4px" }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {navUserSettings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          <MobileNavBar navItems={navItemsDisplayed} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
