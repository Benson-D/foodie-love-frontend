import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import homeImage from "/img/foodie-background-2.jpg";
import ImageSlider from "../features/imageSlider/ImageSlider";
import useTitle from "../hooks/useTitle";

const HomeLayout = styled("section")({
  backgroundImage: `linear-gradient(4deg,
                        rgb(168 120 99 / 30%) 45%,
                        rgba(232,120,12,0.3) 100%),
                        url(${homeImage})`,
  backgroundPosition: "bottom left",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "80vh",
  color: "#fff",
  paddingTop: 60,
  paddingBottom: 70,
  paddingLeft: 26,
});

/**
 * Initial page when a user is signed in or not
 *
 * Props: none
 * State: none
 *
 * Routes -> Homepage
 */
function HomePage() {
  useTitle("Foodie Love");

  return (
    <HomeLayout>
      <Typography variant="h3" sx={{ fontSize: { xs: 30, sm: 45, md: 50 } }}>
        Welcome To Foodie Love!
      </Typography>
      <p>A place to keep your recipes in check</p>
      <ImageSlider />
    </HomeLayout>
  );
}

export default HomePage;
