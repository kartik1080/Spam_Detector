import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <span>© {new Date().getFullYear()} Spam Detector. All rights reserved.</span>
        </footer>
    );
}

export default Footer; 