import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
  IconButton,
  Avatar,
} from "@mui/material";
import useToggle from "../../hooks/useToggle";
import SideModal from "../../components/SideModal";
import ListItems from "./ListItems";
import { LockOpen, Lock } from "@mui/icons-material";

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
  {
    title: "Logout",
    link: "/",
    icon: <Lock />,
  },
];

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
        noWrap
        sx={{
          display: { xs: "flex", sm: "none" },
          fontFamily: "monospace",
          fontWeight: 700,
          flexGrow: 1,
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

  const navItemsDisplayed = user !== null ? navItemsAuth : navItems;

  console.log(user, "valid user");

  return (
    <AppBar position="static" sx={{ backgroundColor: "#04b597" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StorefrontIcon sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              display: { xs: "none", sm: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
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
                <IconButton>
                  <Avatar
                    alt="foodie-user"
                    src={user && user?.imageUrl ? user.imageUrl : ""}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          <MobileNavBar navItems={navItems} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
