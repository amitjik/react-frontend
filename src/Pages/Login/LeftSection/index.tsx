import React from 'react';
import flyImage from './../../../Assests/images/login-sideImage.png';
import './style.css';

const LeftLoginSection: React.FC = () => (
    <div className='left-section-login'>
        <div className='content-section-login'>
            <div className='heading-section'>
                <h3>Bringing blue back in the skies</h3>
                <h4>India’s largest and most preferred passenger airline and amongst the fastest growing airlines in the world</h4>
            </div>
            <img src={flyImage} alt='indigo' />
        </div>
    </div>

);

export default LeftLoginSection;