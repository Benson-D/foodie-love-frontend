import { useState } from 'react'; 
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Arrow from './Arrow';
import useStep from '../hooks/useStep';
import { sliderImage } from '../data/sliderImage';

const ImageLayout = styled(Box)({
    position: 'relative',
    overflow: 'hidden',
    maxWidth: 500,
    width: 500,
    height: 300
});

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
        <ImageLayout>
            <div style={{ 
                height: '500px',
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
        </ImageLayout>
    );
}

export default ImageSlider; 