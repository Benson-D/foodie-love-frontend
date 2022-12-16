import { useState } from 'react'; 
import { Box } from '@mui/material';
import Arrow from './Arrow';
import useStep from '../hooks/useStep';

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
    const [image, helpers] = useStep(sliderImage.length + 1);

    const { nextSwitchStep, prevSwitchStep } = helpers;
    
    return (
        <Box sx={{ 
            maxWidth: 500,
            width: 500,
            height: 300, 
            mt: 10, 
            ml: 3, 
            position: 'relative', 
            overflow: 'hidden'}}>
            <div style={{ 
                height: '100%',
                width: '500px',
                transform: `translateX(0px)`,
                transition: 'transform ease-out 0.45s'}}>
                    <div style={{
                        backgroundImage: `url(${items[image - 1].url})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        height: '100%',
                        width: '100%'
                    }}></div>
            </div>
            <Arrow direction='left' handleClick={prevSwitchStep}/>
            <Arrow direction='right' handleClick={nextSwitchStep}/>
        </Box>
    );
}

export default ImageSlider; 