import { useState } from 'react'; 
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Arrow from './Arrow';
import useStep from '../hooks/useStep';
import { sliderImage } from '../data/sliderImage';

const ImageLayout = styled(Box)({
    position: 'relative',
    overflow: 'hidden',
    maxWidth: 500
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
    const [image, helpers] = useStep(sliderImage.length);

    const { nextSwitchStep, prevSwitchStep } = helpers;

    return (
        <ImageLayout>
            <div style={{ 
                height: '300px',
                width: '100%',
                whiteSpace: 'nowrap',
                transform: `translate3d(${-(image) * 100}%, 0, 0)`,
                transition: 'transform ease-out 1s'}}>
                    {items.map((item, idx) => (
                        <div key={idx} style={{
                            display: 'inline-block',
                            backgroundImage:`url(${item.url})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            height: '100%',
                            width: '100%'
                        }}>
                        </div>
                    ))}
            </div>
            <Arrow direction='left' handleClick={prevSwitchStep}/>
            <Arrow direction='right' handleClick={nextSwitchStep}/>
        </ImageLayout>
    );
}

export default ImageSlider; 