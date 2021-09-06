import React from 'react'

function Footer(){
    return(
        <div style={{
            height: '80px', 
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center', 
            fontSize:'1rem'
        }}>
        
            <ul className="copyright">
                <li>&copy; Copyright 2021</li>
                <li>Korea Creative Content Agency all rights reserved</li>
                <li>by like-professional</li>
            </ul>
        </div>
    )
}

export default Footer;
