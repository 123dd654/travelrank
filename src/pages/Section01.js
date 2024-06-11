import React, { useState, useEffect, useRef } from 'react';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';
import cities from '../data/cities';
import cityicon from '../assets/img/citypage_icon.png';

const MAX_VISIBILITY = 2;

const Card = ({ title, description, image, alt }) => (
    <div className='city-card'>
        <img src={image} alt={alt} className="city-image" />
        <div className="city-info">
            <h2>{title}</h2>
            <p>{description}</p>
            <button className="detail_button">상세보기</button>
        </div>
    </div>
);

const Carousel = ({ children }) => {
    const [active, setActive] = useState(MAX_VISIBILITY);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const count = React.Children.count(children);
    const childrenArray = React.Children.toArray(children);

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            setActive(count - 1 + MAX_VISIBILITY);
        } else if (newIndex >= count + MAX_VISIBILITY) {
            setActive(0 + MAX_VISIBILITY);
        } else {
            setActive(newIndex);
        }
    };

    useEffect(() => {
        if (active === count + MAX_VISIBILITY) {
            setTimeout(() => {
                setTransitionEnabled(false);
                setActive(MAX_VISIBILITY);
            }, 300);
        } else if (active === MAX_VISIBILITY - 1) {
            setTimeout(() => {
                setTransitionEnabled(false);
                setActive(count + MAX_VISIBILITY - 1);
            }, 300);
        } else {
            setTransitionEnabled(true);
        }
    }, [active, count]);

    return (
        <div className='carousel'>
            <div className='cards-container'>
                <button className='nav up' onClick={() => updateIndex(active - 1)}><TiChevronLeftOutline /></button>
                {[...childrenArray.slice(-MAX_VISIBILITY), ...childrenArray, ...childrenArray.slice(0, MAX_VISIBILITY)].map((child, i) => (
                    <div className='card-container' key={i} style={{
                        '--active': i === active ? 1 : 0,
                        '--offset': (i - active) / 3,
                        '--direction': Math.sign(i - active),
                        '--abs-offset': Math.abs(i - active) / 3,
                        'pointer-events': active === i ? 'auto' : 'none',
                        'opacity': Math.abs(i - active) >= MAX_VISIBILITY ? '0' : '1',
                        'display': Math.abs(i - active) > MAX_VISIBILITY ? 'none' : 'block',
                        'transition': transitionEnabled ? 'all 0.3s ease-out' : 'none',
                    }}>
                        {child}
                    </div>
                ))}
                <button className='nav down' onClick={() => updateIndex(active + 1)}><TiChevronRightOutline /></button>
            </div>
        </div>
    );
};

const Section01 = () => (
    <>
        <div className="city-section">
            <img src={cityicon} alt='시티아이콘'></img>
            <h1>City</h1>
        </div>
        <div className='cont'>
            <div className='section_img'></div>
            <div className="city-list">
                <Carousel>
                    {cities.map((city, index) => (
                        <Card
                            key={index}
                            title={city.name}
                            description={city.description}
                            image={city.image}
                            alt={city.alt}
                        />
                    ))}
                </Carousel>
            </div>
        </div>
    </>
);

export default Section01;
