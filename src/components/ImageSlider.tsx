import { useState } from 'react'; 
import { Box } from '@mui/material';
import Arrow from './Arrow';

const sliderImage = [
    { url: "/img/gallery1.jpg", title: "mexican" },
    { url: "/img/gallery2.jpg", title: "burger" },
    { url: "/img/gallery3.jpg", title: "indian" },
    { url: "/img/gallery4.jpg", title: "pizza" },
    { url: "/img/gallery5.jpg", title: "pasta" }
];

/**
 * Image Slider rendering on Home Page, 
 * displays a list of popular recipes 
 * 
 * Props: none
 * State: 
 *   items: { url: string, title: string }
 *   image: number 
 * 
 * HomePage -> ImageSlider
 */
function ImageSlider () {
    const [items, setItems] = useState(sliderImage);
    const [image, setImage] = useState<number>(0);

    const prevSlide = () => {
        setImage(currImage => currImage === 0 ? items.length - 1 : currImage - 1)
    }

    const nextSlide = () => {
        setImage(currImage => currImage === items.length - 1 ? 0 : currImage + 1);
    }
    
    return (
        <Box sx={{ width: 350, height: 300, mt: 2, ml: 3, position: 'relative'}}>
            <div style={{
                backgroundImage: `url(${items[image].url})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '100%',
                width: '100%'}}/>
            <Arrow direction='left' handleClick={prevSlide}/>
            <Arrow direction='right' handleClick={nextSlide}/>
        </Box>
    );
}

export default ImageSlider; 