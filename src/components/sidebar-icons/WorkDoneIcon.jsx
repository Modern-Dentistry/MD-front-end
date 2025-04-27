import React from 'react';

const WorkDoneIcon = ({ width = 24, height = 24, stroke = "currentColor" }) => {
    return(
        <svg 
            width={width} 
            height={height} 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M8 2V6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 2V6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 2V6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 4H6C4.89543 4 4 4.89543 4 6V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V6C20 4.89543 19.1046 4 18 4Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 10H14" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 14H16" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 18H13" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};

export default WorkDoneIcon;